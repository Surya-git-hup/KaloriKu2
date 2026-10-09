import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { MacroTargets } from '../types';

interface EditTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTargets: MacroTargets;
  onSave: (targets: MacroTargets) => void;
}

export const EditTargetModal: React.FC<EditTargetModalProps> = ({
  isOpen,
  onClose,
  currentTargets,
  onSave,
}) => {
  const [form, setForm] = useState<MacroTargets>(currentTargets);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Ubah Target Nutrisi Harian</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Target Kalori (kkal)
            </label>
            <input
              type="number"
              min="500"
              max="6000"
              step="50"
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1 truncate">
                Protein (g)
              </label>
              <input
                type="number"
                min="10"
                max="400"
                value={form.protein}
                onChange={(e) => setForm({ ...form, protein: Number(e.target.value) })}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1 truncate">
                Karbohidrat (g)
              </label>
              <input
                type="number"
                min="20"
                max="600"
                value={form.carbs}
                onChange={(e) => setForm({ ...form, carbs: Number(e.target.value) })}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1 truncate">
                Lemak (g)
              </label>
              <input
                type="number"
                min="10"
                max="200"
                value={form.fat}
                onChange={(e) => setForm({ ...form, fat: Number(e.target.value) })}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20"
            >
              <Check className="w-3.5 h-3.5" />
              Simpan Target
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
