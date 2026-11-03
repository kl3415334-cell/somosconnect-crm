/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * PHVA Continuous Improvement Cycle View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  RefreshCw, 
  Target, 
  PlayCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowDown, 
  Plus, 
  Check, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';

export const PHVACycleView: React.FC = () => {
  const { metrics, showToast } = useCRM();

  const [activeStage, setActiveStage] = useState<'P' | 'H' | 'V' | 'A'>('P');
  const [newActionItem, setNewActionItem] = useState('');
  const [improvementLog, setImprovementLog] = useState([
    { id: 'imp-1', etapa: 'ACTUAR', titulo: 'Capacitación en redacción asertiva para asesores', fecha: '2026-02-20', estado: 'Completada' },
    { id: 'imp-2', etapa: 'ACTUAR', titulo: 'Actualización de plantilla de acta de entrega de kits escolares', fecha: '2026-02-23', estado: 'Completada' },
    { id: 'imp-3', etapa: 'PLANEAR', titulo: 'Ampliación de canal WhatsApp Business para agendamiento', fecha: '2026-02-27', estado: 'En curso' }
  ]);

  const stagesData = {
    P: {
      letra: 'P',
      nombre: 'PLANEAR',
      color: 'bg-blue-600 text-white',
      border: 'border-blue-600',
      lightBg: 'bg-blue-50 text-blue-900',
      descripcion: 'Identificar necesidades de los usuarios; definir canales, protocolos, responsables, criterios de clasificación, plazos aplicables e indicadores.',
      actividades: [
        'Identificar las necesidades y expectativas de los beneficiarios y usuarios.',
        'Definir los canales de atención institucionales (WhatsApp, Correo, PBX, Web, Presencial).',
        'Establecer protocolos de atención humanizada y respeto a los derechos humanos.',
        'Asignar responsables por cada área competente de la Corporación.',
        'Definir indicadores clave de desempeño (KPIs) y plazos legales conforme a la Ley 1755.'
      ],
      kpisAsociados: 'Definición de metas SLA, tiempos límite y normas aplicables.'
    },
    H: {
      letra: 'H',
      nombre: 'HACER',
      color: 'bg-sky-600 text-white',
      border: 'border-sky-600',
      lightBg: 'bg-sky-50 text-sky-900',
      descripcion: 'Recibir y registrar solicitudes; clasificarlas; asignar responsables; realizar la gestión; comunicar avances y emitir respuestas.',
      actividades: [
        'Recibir solicitudes por todos los canales disponibles de forma oportuna.',
        'Registrar con número consecutivo automático cada PQRS en la plataforma.',
        'Clasificar técnicamente el caso (Petición, Queja, Reclamo, etc.).',
        'Asignar el colaborador y área encargada con fecha límite establecida.',
        'Gestionar el requerimiento internamente y preparar proyecto de respuesta.',
        'Comunicar avances y emitir respuesta formal respetuosa y de fondo.'
      ],
      kpisAsociados: 'Volumen de solicitudes radicadas, asignadas y respondidas.'
    },
    V: {
      letra: 'V',
      nombre: 'VERIFICAR',
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-600',
      lightBg: 'bg-emerald-50 text-emerald-900',
      descripcion: 'Revisar tiempos de atención, casos pendientes, cumplimiento de plazos, solicitudes solucionadas, satisfacción y causas frecuentes de quejas.',
      actividades: [
        'Revisar diariamente los tiempos transcurridos de atención y alertas de vencimiento.',
        'Analizar el listado de casos pendientes y solicitudes sin gestión > 48 horas.',
        'Medir el porcentaje de satisfacción del usuario mediante encuestas CSAT (1-5 estrellas).',
        'Revisar indicadores de cumplimiento de términos legales e institucionales.',
        'Identificar fallas recurrentes en la atención y motivos de quejas o reclamos.'
      ],
      kpisAsociados: `Tiempo promedio (${metrics.tiempoPromedioRespuestaDias}d), Satisfacción (${metrics.porcentajeSatisfaccion}%), Casos vencidos (${metrics.solicitudesVencidas}).`
    },
    A: {
      letra: 'A',
      nombre: 'ACTUAR',
      color: 'bg-purple-600 text-white',
      border: 'border-purple-600',
      lightBg: 'bg-purple-50 text-purple-900',
      descripcion: 'Corregir fallas; actualizar procedimientos; capacitar al personal; mejorar canales y optimizar la experiencia del usuario.',
      actividades: [
        'Implementar acciones correctivas y preventivas inmediatas ante inconformidades.',
        'Actualizar los manuales, procedimientos y protocolos de servicio al cliente.',
        'Capacitar continuamente a los colaboradores y asesores en atención empática.',
        'Mejorar la accesibilidad e integraciones de los canales de atención.',
        'Optimizar permanentemente el funcionamiento y utilidades de la plataforma SomosConnect CRM.',
        'Retroalimentar el proceso para VOLVER A PLANEAR (Mejora Continua).'
      ],
      kpisAsociados: 'Disminución de quejas reiteradas e incremento de satisfacción.'
    }
  };

  const currentStageInfo = stagesData[activeStage];

  const handleAddImprovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionItem.trim()) return;

    const newImp = {
      id: `imp-${Date.now()}`,
      etapa: currentStageInfo.nombre,
      titulo: newActionItem.trim(),
      fecha: new Date().toISOString().substring(0, 10),
      estado: 'En curso'
    };

    setImprovementLog(prev => [newImp, ...prev]);
    setNewActionItem('');
    showToast(`Acción de mejora registrada en la etapa de ${currentStageInfo.nombre}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ciclo PHVA de Mejora Continua</h2>
          <p className="text-xs text-slate-500">
            Metodología Planear - Hacer - Verificar - Actuar aplicada a la excelencia en el Servicio al Cliente.
          </p>
        </div>
      </div>

      {/* Visual Interactive Diagram Bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Flujograma del Proceso de Servicio al Cliente
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Ciclo PHVA en Corporación Social Somos Uno
          </h3>
        </div>

        {/* The 4 Stage Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['P', 'H', 'V', 'A'] as const).map(stageKey => {
            const stage = stagesData[stageKey];
            const isSelected = activeStage === stageKey;

            return (
              <button
                key={stageKey}
                onClick={() => setActiveStage(stageKey)}
                className={`p-4 rounded-2xl border-2 text-left transition relative overflow-hidden ${
                  isSelected
                    ? `${stage.border} bg-white shadow-md`
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl font-bold font-mono text-sm flex items-center justify-center ${stage.color}`}>
                    {stage.letra}
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      Activa
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-sm text-slate-900">{stage.nombre}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {stage.descripcion}
                </p>
              </button>
            );
          })}
        </div>

        {/* Text flow depiction from page 5 of PDF */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center text-xs text-slate-600 font-mono flex flex-wrap items-center justify-center gap-2">
          <span className="font-bold text-slate-800">INICIO</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-blue-700">PLANEAR</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-sky-700">HACER</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-emerald-700">VERIFICAR</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-purple-700">ACTUAR</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-indigo-700">VOLVER A PLANEAR (Mejora Continua)</span>
        </div>
      </div>

      {/* Selected Stage Detail & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className={`w-10 h-10 rounded-xl font-bold font-mono text-base flex items-center justify-center ${currentStageInfo.color}`}>
              {currentStageInfo.letra}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Etapa: {currentStageInfo.nombre}
              </h3>
              <p className="text-xs text-slate-500">
                {currentStageInfo.descripcion}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Actividades Obligatorias de esta Etapa
            </h4>
            <div className="space-y-2">
              {currentStageInfo.actividades.map((act, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {act}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700">
            <strong>Indicadores e Impacto Evaluado:</strong> {currentStageInfo.kpisAsociados}
          </div>
        </div>

        {/* Action Item Register for Continuous Improvement */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">
            Registro de Acciones de Mejora
          </h3>
          <p className="text-xs text-slate-500">
            Planes de acción derivados de auditorías, quejas y encuestas de satisfacción.
          </p>

          <form onSubmit={handleAddImprovement} className="space-y-2">
            <input
              type="text"
              required
              value={newActionItem}
              onChange={e => setNewActionItem(e.target.value)}
              placeholder={`Nueva acción para ${currentStageInfo.nombre}...`}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Registrar Acción de Mejora</span>
            </button>
          </form>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Bitácora de Mejoras ({improvementLog.length})
            </span>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {improvementLog.map(item => (
                <div key={item.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900 text-[11px]">{item.etapa}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {item.estado}
                    </span>
                  </div>
                  <p className="text-slate-800 font-medium text-[11px] leading-snug">{item.titulo}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{item.fecha}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
