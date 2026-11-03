/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Colombian Legal Framework & Response Term Configurator for SomosConnect CRM
 */

import React, { useState } from 'react';
import { 
  Scale, 
  ExternalLink, 
  BookOpen, 
  Sliders, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  Edit3, 
  Save,
  Lock
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { TipoPQRS, TerminoConfig } from '../types';

export const LegalNormsView: React.FC = () => {
  const { normatividad, terminosConfig, updateTerminoConfig, currentUser, showToast } = useCRM();

  const [activeTab, setActiveTab] = useState<'normas' | 'configurador'>('normas');
  const [editingTipo, setEditingTipo] = useState<TipoPQRS | null>(null);
  const [editDays, setEditDays] = useState<number>(15);
  const [editRef, setEditRef] = useState<string>('');

  const handleStartEdit = (termino: TerminoConfig) => {
    if (!currentUser.permisos.canConfigureLegal) {
      showToast('Acceso restringido: Solo Administrador y Gerente pueden configurar los plazos legales.', 'error');
      return;
    }
    setEditingTipo(termino.tipoPQRS);
    setEditDays(termino.diasHabiles);
    setEditRef(termino.normaReferencia);
  };

  const handleSaveTermino = (tipo: TipoPQRS) => {
    const res = updateTerminoConfig(tipo, editDays, editRef);
    if (res.success) {
      setEditingTipo(null);
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Normatividad Legal Colombiana</h2>
          <p className="text-xs text-slate-500">
            Marco normativo de Servicio al Cliente, Derecho de Petición (Ley 1755/2015) y Protección de Datos (Ley 1581/2012).
          </p>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('normas')}
            className={`px-3.5 py-1.5 rounded-lg transition ${
              activeTab === 'normas' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marco Normativo (7 Leyes)
          </button>
          <button
            onClick={() => setActiveTab('configurador')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'configurador' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Configurador de Plazos</span>
          </button>
        </div>
      </div>

      {activeTab === 'normas' ? (
        <div className="space-y-6">
          {/* Important consideration banner */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <span>Consideraciones para el Cumplimiento Legal en Corporación Social Somos Uno</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-blue-900/90 text-[11px] leading-relaxed">
              <li>
                <strong>Plazos diferenciados:</strong> No todas las solicitudes tienen el mismo término legal. Las peticiones de copias o información tienen un término de 10 días hábiles, mientras que las de interés general o quejas tienen 15 días, y las consultas complejas hasta 30 días.
              </li>
              <li>
                <strong>Aplicación a entidades privadas:</strong> La Ley 1755 de 2015 contempla supuestos específicos para ejercer el derecho de petición ante organizaciones privadas (Arts. 32 y 33). No todos los términos aplican automáticamente por defecto; por ello SomosConnect permite ajustar plazos según la naturaleza del trámite.
              </li>
              <li>
                <strong>Protección de datos (Ley 1581):</strong> Se limita el acceso a datos personales sensibles según perfiles autorizados y se exige autorización previa en todos los radicados.
              </li>
            </ul>
          </div>

          {/* Cards for each norm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {normatividad.map(norma => (
              <div 
                key={norma.id} 
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase">
                        {norma.numeroAno}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1.5 leading-snug">
                        {norma.nombre}
                      </h3>
                    </div>
                    {norma.fuenteUrl && (
                      <a
                        href={norma.fuenteUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Ver fuente oficial en Función Pública / Senado"
                        className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {norma.descripcion}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Aplicación en el Servicio al Cliente
                    </span>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {norma.aplicacion}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Recomendaciones:</strong> {norma.recomendaciones}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Configurador de Plazos Tab */
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-slate-900 text-sm">
                Configuración Personalizada de Plazos Legales e Institucionales
              </p>
              <p className="text-slate-500 text-[11px]">
                Permite al Administrador y Gerente calibrar los días hábiles de respuesta según los manuales internos de la Corporación.
              </p>
            </div>
            {!currentUser.permisos.canConfigureLegal && (
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg text-[10px] flex items-center gap-1 shrink-0">
                <Lock className="w-3 h-3" />
                <span>Modo Solo Lectura (Requiere perfil Administrador)</span>
              </span>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Tipo de Solicitud</th>
                    <th className="py-3 px-3">Término Configurado</th>
                    <th className="py-3 px-3">Norma de Referencia</th>
                    <th className="py-3 px-3">Aplica a Entidad Privada</th>
                    <th className="py-3 px-3">Alcance Institucional</th>
                    <th className="py-3 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {terminosConfig.map(termino => {
                    const isEditing = editingTipo === termino.tipoPQRS;

                    return (
                      <tr key={termino.tipoPQRS} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {termino.tipoPQRS}
                        </td>

                        <td className="py-3 px-3">
                          {isEditing ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min={1}
                                max={60}
                                value={editDays}
                                onChange={e => setEditDays(parseInt(e.target.value) || 1)}
                                className="w-16 px-2 py-1 text-xs border border-blue-400 rounded-md font-mono"
                              />
                              <span className="text-[11px] text-slate-500">días hábiles</span>
                            </div>
                          ) : (
                            <span className="font-mono font-bold text-blue-900 tabular-nums">
                              {termino.diasHabiles} días hábiles
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editRef}
                              onChange={e => setEditRef(e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-blue-400 rounded-md"
                            />
                          ) : (
                            <span className="text-slate-600 font-medium">{termino.normaReferencia}</span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                            {termino.aplicaEntidadPrivada ? 'Sí aplica' : 'Opcional'}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-slate-500 text-[11px] max-w-[200px]">
                          {termino.descripcion}
                        </td>

                        <td className="py-3 px-3 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleSaveTermino(termino.tipoPQRS)}
                                className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition"
                              >
                                Guardar
                              </button>
                              <button
                                onClick={() => setEditingTipo(null)}
                                className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-md transition"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartEdit(termino)}
                              disabled={!currentUser.permisos.canConfigureLegal}
                              className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md disabled:opacity-40 transition"
                            >
                              Editar Plazo
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
