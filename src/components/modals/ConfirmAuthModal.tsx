/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Security Authorization & Deletion Confirmation Modal for SomosConnect CRM
 */

import React, { useState } from 'react';
import { X, ShieldAlert, Lock, Trash2 } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

interface ConfirmAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  recordIdentifier: string;
  onConfirm: (authCode: string) => void;
  confirmButtonText?: string;
}

export const ConfirmAuthModal: React.FC<ConfirmAuthModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  recordIdentifier,
  onConfirm,
  confirmButtonText = 'Confirmar Eliminación'
}) => {
  const { currentUser } = useCRM();
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authCode.trim()) {
      setError('Debe ingresar la clave o código de autorización.');
      return;
    }
    onConfirm(authCode.trim());
    setAuthCode('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-red-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-red-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-200" />
            <div>
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="text-[11px] text-red-200">Control de Seguridad y Auditoría Institucional</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-red-200 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleExecute} className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-red-800 space-y-1">
            <p className="font-semibold">{description}</p>
            <p className="font-mono text-[11px] font-bold text-red-950">
              Registro: {recordIdentifier}
            </p>
          </div>

          <div className="text-slate-600 space-y-1 text-[11px] leading-relaxed">
            <p>
              Esta acción quedará registrada en la <strong>Bitácora de Auditoría</strong> bajo el usuario:{' '}
              <span className="font-semibold text-slate-800">{currentUser.nombre}</span> ({currentUser.cargo}).
            </p>
            <p className="text-slate-500 italic">
              Código de confirmación institucional: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">AUTORIZAR-SOMOSUNO</code> o <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">1234</code>.
            </p>
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-[11px]">{error}</p>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Clave de Autorización Requerida *</span>
            </label>
            <input
              type="password"
              required
              autoFocus
              value={authCode}
              onChange={e => setAuthCode(e.target.value)}
              placeholder="Ingrese código de autorización..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs flex items-center gap-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{confirmButtonText}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
