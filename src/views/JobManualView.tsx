/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Job Manual (Manual de Funciones) View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  Briefcase, 
  Download, 
  Printer, 
  Edit3, 
  Check, 
  ShieldCheck, 
  Award, 
  UserCheck, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { ManualCargo } from '../types';
import { exportJobManualToPDF } from '../utils/exportUtils';

export const JobManualView: React.FC = () => {
  const { manualCargos, updateManualCargo, currentUser, showToast } = useCRM();

  const [selectedCargoId, setSelectedCargoId] = useState<string>(manualCargos[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [editCargo, setEditCargo] = useState<ManualCargo | null>(null);

  const selectedCargo = manualCargos.find(c => c.id === selectedCargoId) || manualCargos[0];

  const handleStartEdit = () => {
    if (!currentUser.permisos.canEditFunctions) {
      showToast('Acceso restringido: Solo Administrador y Gerente pueden editar el Manual de Funciones.', 'error');
      return;
    }
    setEditCargo(JSON.parse(JSON.stringify(selectedCargo)));
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCargo) return;
    updateManualCargo(editCargo.id, editCargo);
    setIsEditing(false);
  };

  const handleDownloadPDF = () => {
    if (selectedCargo) {
      exportJobManualToPDF(selectedCargo);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Manual de Funciones y Perfiles</h2>
          <p className="text-xs text-slate-500">
            Definición oficial de responsabilidades, autoridad, competencias e indicadores para los 5 cargos de Servicio al Cliente.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-red-600" />
            <span>Descargar PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Imprimir</span>
          </button>
          {currentUser.permisos.canEditFunctions && (
            <button
              onClick={handleStartEdit}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar Cargo</span>
            </button>
          )}
        </div>
      </div>

      {/* Cargo Switcher Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {manualCargos.map(cargo => {
          const isSelected = selectedCargo?.id === cargo.id;
          return (
            <button
              key={cargo.id}
              onClick={() => {
                setSelectedCargoId(cargo.id);
                setIsEditing(false);
              }}
              className={`p-3 rounded-xl border text-left transition ${
                isSelected
                  ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <p className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {cargo.cargo}
              </p>
              <p className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                {cargo.area}
              </p>
            </button>
          );
        })}
      </div>

      {/* Manual Content Display */}
      {selectedCargo && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
          {/* Institutional Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                CORPORACIÓN SOCIAL SOMOS UNO · MANUAL ESPECÍFICO DE FUNCIONES
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {selectedCargo.cargo}
              </h3>
              <p className="text-xs text-slate-500">
                Área: <strong className="text-slate-700">{selectedCargo.area}</strong> · Jefe Inmediato: <strong className="text-slate-700">{selectedCargo.jefeInmediato}</strong>
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-400 font-mono">
              <p>Código: CS-MF-2026</p>
              <p>Vigencia: 2026 Actualizada</p>
            </div>
          </div>

          {/* Section 1: Objetivo */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
              <span>1. Objetivo General del Cargo</span>
            </h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
              {selectedCargo.objetivo}
            </div>
          </div>

          {/* Section 2: Funciones Principales */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
              2. Funciones Principales
            </h4>
            <div className="space-y-2">
              {selectedCargo.funciones.map((func, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {func}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Responsabilidades y Autoridad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Responsabilidades Clave
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedCargo.responsabilidades.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                4. Autoridad y Toma de Decisiones
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedCargo.autoridad.map((aut, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{aut}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Perfil y Competencias */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3 text-xs">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              5. Perfil Requerido y Competencias Laborales
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="font-semibold text-slate-700 block">Formación Académica:</span>
                <p className="text-slate-800">{selectedCargo.perfil.educacion}</p>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Experiencia Mínima:</span>
                <p className="text-slate-800">{selectedCargo.perfil.experiencia}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-100">
              <span className="font-semibold text-slate-700 block mb-1">Competencias Clave:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCargo.competencias.map((comp, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white border border-blue-200 text-blue-800 text-[11px] font-semibold">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Indicadores de Desempeño */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              6. Indicadores de Desempeño Evaluados al Cargo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedCargo.indicadores.map((ind, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800 block">KPI #{idx + 1}</span>
                  <p className="text-slate-600 mt-1">{ind}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Cargo Modal */}
      {isEditing && editCargo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-[#002b55] text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Editar Manual del Cargo: {editCargo.cargo}</h3>
              <button onClick={() => setIsEditing(false)} className="text-sky-200 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEdit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Objetivo General</label>
                <textarea
                  rows={3}
                  value={editCargo.objetivo}
                  onChange={e => setEditCargo({ ...editCargo, objetivo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Área y Jefe Inmediato</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={editCargo.area}
                    onChange={e => setEditCargo({ ...editCargo, area: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={editCargo.jefeInmediato}
                    onChange={e => setEditCargo({ ...editCargo, jefeInmediato: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                >
                  Guardar Manual
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
