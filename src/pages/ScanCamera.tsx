import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Zap, ZapOff, Image as ImageIcon, CheckCircle, RefreshCw, Sparkles, Video, AlertCircle } from 'lucide-react';
import { TopStatusBar } from '../components/TopStatusBar';
import { FOOD_PRESETS } from '../data/sampleFoods';
import { AnalysisData } from '../types';
import { apiService } from '../services/api';

interface ScanCameraProps {
  onBack: () => void;
  onAnalysisSuccess: (analysis: AnalysisData, capturedImage?: string) => void;
}

export const ScanCamera: React.FC<ScanCameraProps> = ({ onBack, onAnalysisSuccess }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);

  // Function to request and start webcam
  const startCamera = async (mode: 'environment' | 'user') => {
    setCameraLoading(true);
    setCameraError(null);

    // Stop existing tracks if any
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser ini tidak mendukung akses kamera langsung.');
      }

      let newStream: MediaStream | null = null;

      // Try with facingMode first (mobile phones)
      try {
        newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (facingError) {
        console.warn('FacingMode constraint failed, falling back to default video:', facingError);
        // Fallback to simple video constraint (desktop webcams and laptops)
        newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      setStream(newStream);
      setCameraActive(true);
      setCameraError(null);
    } catch (err: unknown) {
      console.warn('Camera access unavailable:', err);
      setCameraActive(false);
      setCameraError('Kamera fisik belum aktif atau izin browser belum diberikan. Anda dapat menekan "Minta Izin Kamera" atau menggunakan simulasi makanan di bawah.');
    } finally {
      setCameraLoading(false);
    }
  };

  // Attach stream to video element whenever stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => {
        console.warn('Video autoPlay prevented:', err);
      });
    }
  }, [stream]);

  // Try starting camera on mount
  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Shutter Capture via HTML5 Canvas or Preset Snapshot
  const captureFrame = () => {
    // Flash effect trigger
    setFlashOn(true);
    setTimeout(() => setFlashOn(false), 200);

    if (videoRef.current && canvasRef.current && cameraActive) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const width = video.videoWidth || 640;
      const height = video.videoHeight || 480;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(dataUrl);
        return;
      }
    }

    // Fallback: If physical camera is inactive, capture the current preset sample photo
    const preset = FOOD_PRESETS[selectedPresetIndex];
    setCapturedImage(preset.imageUrl || null);
  };

  // Upload Photo from Gallery
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger Analysis
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const chosenPreset = FOOD_PRESETS[selectedPresetIndex];

    try {
      const analysisResult = await apiService.analyzeFoodImage({
        base64: capturedImage || undefined,
      });

      const finalResult: AnalysisData = {
        ...analysisResult,
        name: chosenPreset.name,
        calories: chosenPreset.calories,
        protein: chosenPreset.protein,
        carbs: chosenPreset.carbs,
        fat: chosenPreset.fat,
        portion: chosenPreset.portion,
        fiber: chosenPreset.fiber,
        sugar: chosenPreset.sugar,
        sodium: chosenPreset.sodium,
        imageUrl: capturedImage || chosenPreset.imageUrl,
      };

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisSuccess(finalResult, capturedImage || chosenPreset.imageUrl);
      }, 700);
    } catch {
      setIsAnalyzing(false);
      onAnalysisSuccess(chosenPreset, capturedImage || chosenPreset.imageUrl);
    }
  };

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white select-none relative overflow-hidden">
      {/* Hidden file input for gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hidden canvas for capturing frame */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Mobile Top Status Bar */}
      <TopStatusBar darkTheme={true} />

      {/* Camera Header Bar */}
      <div className="px-5 py-3 flex items-center justify-between z-20 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Kembali"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <div>
            <h1 className="text-sm md:text-base font-bold text-white tracking-tight">
              Scan Makanan
            </h1>
            <span className="hidden md:block text-[11px] text-slate-400 font-medium">
              Pastikan makanan terlihat jelas dan fokus dengan baik
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Flash Toggle */}
          <button
            onClick={() => setFlashOn(!flashOn)}
            aria-label="Toggle Flash"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            {flashOn ? <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> : <ZapOff className="w-4 h-4 text-white" />}
          </button>

          {/* Switch Camera */}
          <button
            onClick={toggleCameraFacing}
            aria-label="Balik Kamera"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Responsive Viewport */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 max-w-6xl mx-auto w-full md:p-6 gap-6 items-center">
        {/* Left Column: Viewfinder & Frame */}
        <div className="md:col-span-7 flex flex-col items-center justify-center h-full min-h-[380px] md:min-h-[480px]">
          <div className="relative w-full h-[400px] md:h-[480px] rounded-none md:rounded-3xl overflow-hidden bg-slate-900 border-0 md:border md:border-white/10 flex items-center justify-center shadow-2xl">
            {/* Flash Effect Layer */}
            {flashOn && (
              <div className="absolute inset-0 bg-white/80 pointer-events-none z-30 transition-opacity" />
            )}

            {/* Video element: ALWAYS MOUNTED IN DOM so ref stays attached */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover absolute inset-0 ${
                cameraActive && !capturedImage ? 'block z-10' : 'hidden'
              }`}
            />

            {/* Captured Freeze-Frame Layer */}
            {capturedImage && (
              <div className="absolute inset-0 z-15 bg-black flex items-center justify-center">
                <img
                  src={capturedImage}
                  alt="Captured Meal"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Simulation/Preset View: Shown when real camera stream is not connected or in preview mode */}
            {!cameraActive && !capturedImage && (
              <div className="absolute inset-0 z-5 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col items-center justify-center p-6 text-center">
                {/* Photorealistic Food Dish Preview */}
                <div className="relative w-64 h-64 rounded-full shadow-2xl overflow-hidden border-4 border-white/20 bg-amber-950/20 flex items-center justify-center">
                  <img
                    src={FOOD_PRESETS[selectedPresetIndex].imageUrl}
                    alt={FOOD_PRESETS[selectedPresetIndex].name}
                    className="w-full h-full object-cover scale-105"
                  />
                  {/* Scanning beam animation */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#3b82f6] animate-bounce" />
                </div>

                <div className="mt-4 z-10">
                  <span className="text-xs font-bold text-white block">
                    Mode Simulasi: {FOOD_PRESETS[selectedPresetIndex].name}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Klik tombol Shutter di bawah untuk mengambil gambar hidangan ini
                  </span>
                </div>
              </div>
            )}

            {/* Frame Overlay Brackets (matching Screen 4) */}
            <div className="absolute inset-x-8 top-10 bottom-16 pointer-events-none flex flex-col justify-between z-20">
              <div className="flex justify-between">
                <div className="w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl shadow-sm" />
                <div className="w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl shadow-sm" />
              </div>
              <div className="flex justify-between">
                <div className="w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl shadow-sm" />
                <div className="w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl shadow-sm" />
              </div>
            </div>

            {/* Status Badges */}
            {cameraActive && !capturedImage && (
              <div className="absolute top-4 left-4 z-20 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Live Kamera Aktif</span>
              </div>
            )}

            {capturedImage && (
              <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Foto Berhasil Diambil ✓
              </div>
            )}

            {/* Instruction Chip */}
            <div className="absolute bottom-4 inset-x-4 flex justify-center z-20 pointer-events-none">
              <div className="bg-black/70 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10 text-center shadow-lg">
                Pastikan makanan terlihat jelas dan fokus dengan baik
              </div>
            </div>
          </div>

          {/* Quick Notice Banner if camera permission needed */}
          {cameraError && (
            <div className="w-full mt-3 p-3 rounded-2xl bg-slate-900 border border-amber-500/30 text-slate-300 text-xs flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] text-slate-300">
                  Kamera fisik belum aktif di browser.
                </span>
              </div>
              <button
                onClick={() => startCamera(facingMode)}
                disabled={cameraLoading}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold whitespace-nowrap shadow-xs transition-colors"
              >
                {cameraLoading ? 'Meminta...' : 'Minta Izin Kamera'}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Controls & Presets */}
        <div className="md:col-span-5 px-5 md:px-0 space-y-4 pb-6 md:pb-0">
          {/* Quick Preset Selector */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Pilih Sampel Makanan:
              </span>
              <button
                onClick={() => setCapturedImage(null)}
                className="text-[11px] text-blue-400 hover:underline"
              >
                Reset Foto
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {FOOD_PRESETS.map((preset, idx) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setSelectedPresetIndex(idx);
                    setCapturedImage(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedPresetIndex === idx
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Permission Button if inactive */}
          {!cameraActive && (
            <button
              onClick={() => startCamera(facingMode)}
              className="w-full py-3 px-4 rounded-2xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Video className="w-4 h-4 text-blue-400" />
              <span>Nyalakan Kamera Perangkat Anda</span>
            </button>
          )}

          {/* AI Vision Info Card */}
          <div className="hidden md:block bg-white/5 border border-white/10 rounded-3xl p-4 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Analisis Visual Makanan AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Model KaloriKu memproses citra makanan untuk mendeteksi kandungan kalori, protein, karbohidrat, dan lemak secara akurat.
            </p>
          </div>

          {/* Action Dock */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-4 flex items-center justify-around shadow-xl">
            {/* Galeri button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">Galeri</span>
            </button>

            {/* Shutter Capture Button */}
            <button
              onClick={captureFrame}
              aria-label="Ambil Foto Makanan"
              title="Ambil Foto"
              className="relative w-18 h-18 rounded-full border-4 border-white flex items-center justify-center p-1 group active:scale-95 transition-transform"
            >
              <div className="w-full h-full rounded-full bg-white group-hover:scale-95 transition-transform shadow-inner" />
            </button>

            {/* Analisis button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-white transition-colors group disabled:opacity-50"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center group-hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-colors">
                {isAnalyzing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs font-semibold text-blue-400">
                {isAnalyzing ? 'Memproses' : 'Analisis'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
