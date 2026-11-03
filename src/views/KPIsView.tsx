/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KPIs & Performance Indicators View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Radio, 
  Smile,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';

export const KPIsView: React.FC = () => {
  const { metrics, pqrs, systemUsers } = useCRM();
  const [periodo, setPeriodo] = useState<'semana' | 'mes' | 'trimestre' | 'anio'>('mes');

  // Grounded in the PDF document (page 3-4):
  // Indicadores clave de desempeño y fórmulas de medición
  const kpiList = [
    {
      nombre: 'Tiempo promedio de respuesta',
      formula: 'Promedio de días transcurridos entre recepción y respuesta formal',
      actual: `${metrics.tiempoPromedioRespuestaDias} días hábiles`,
      meta: '<= 5 días hábiles',
      cumple: true,
      progreso: 88,
      utilidad: 'Mide la agilidad y prontitud operativa del equipo de atención al cliente.'
    },
    {
      nombre: 'Porcentaje de solicitudes solucionadas',
      formula: '(Solicitudes solucionadas ÷ Solicitudes recibidas en el período) × 100',
      actual: `${Math.round((metrics.solicitudesSolucionadas / Math.max(metrics.totalSolicitudes, 1)) * 100)}%`,
      meta: '>= 80%',
      cumple: true,
      progreso: 80,
      utilidad: 'Evalúa la capacidad de resolución efectiva de fondo de la organización.'
    },
    {
      nombre: 'Porcentaje de solicitudes pendientes',
      formula: '(Solicitudes pendientes al corte ÷ Total de solicitudes) × 100',
      actual: `${Math.round((metrics.solicitudesPendientes / Math.max(metrics.totalSolicitudes, 1)) * 100)}%`,
      meta: '<= 20%',
      cumple: true,
      progreso: 20,
      utilidad: 'Monitorea el inventario de casos en trámite y evita represamientos.'
    },
    {
      nombre: 'Porcentaje de solicitudes vencidas',
      formula: '(Solicitudes que excedieron el plazo legal ÷ Total de solicitudes) × 100',
      actual: `${Math.round((metrics.solicitudesVencidas / Math.max(metrics.totalSolicitudes, 1)) * 100)}%`,
      meta: '0% (Cero vencimientos)',
      cumple: metrics.solicitudesVencidas === 0,
      progreso: metrics.solicitudesVencidas === 0 ? 100 : 75,
      utilidad: 'Garantiza el cumplimiento estricto del derecho de petición (Ley 1755 de 2015).'
    },
    {
      nombre: 'Nivel de satisfacción del usuario (CSAT)',
      formula: 'Promedio o porcentaje de calificaciones positivas en las encuestas',
      actual: `${metrics.porcentajeSatisfaccion}%`,
      meta: '>= 90%',
      cumple: metrics.porcentajeSatisfaccion >= 90,
      progreso: metrics.porcentajeSatisfaccion,
      utilidad: 'Termómetro fundamental de la percepción y calidad del servicio brindado.'
    },
    {
      nombre: 'Cumplimiento de términos de respuesta (SLA)',
      formula: '(Solicitudes respondidas dentro del plazo ÷ Solicitudes cuyo plazo venció) × 100',
      actual: `${metrics.tasaCumplimientoTiempos}%`,
      meta: '>= 95%',
      cumple: true,
      progreso: 96,
      utilidad: 'Asegura la oportunidad jurídica y el debido proceso administrativo.'
    }
  ];

  // Solicitudes por colaborador
  const collaboratorStats = systemUsers.map(colab => {
    const assigned = pqrs.filter(p => p.colaboradorAsignado === colab.nombre);
    const solved = assigned.filter(p => p.estado === 'Solucionada y cerrada').length;
    const pending = assigned.length - solved;
    const rate = assigned.length > 0 ? Math.round((solved / assigned.length) * 100) : 100;
    return {
      nombre: colab.nombre,
      cargo: colab.cargo,
      total: assigned.length,
      solved,
      pending,
      rate
    };
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Indicadores de Gestión (KPI)</h2>
          <p className="text-xs text-slate-500">
            Medición automática del desempeño del área de Servicio al Cliente para la toma de decisiones estratégicas.
          </p>
        </div>

        {/* Period filter buttons */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setPeriodo('semana')}
            className={`px-3 py-1.5 rounded-lg transition ${
              periodo === 'semana' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriodo('mes')}
            className={`px-3 py-1.5 rounded-lg transition ${
              periodo === 'mes' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setPeriodo('trimestre')}
            className={`px-3 py-1.5 rounded-lg transition ${
              periodo === 'trimestre' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Trimestre
          </button>
          <button
            onClick={() => setPeriodo('anio')}
            className={`px-3 py-1.5 rounded-lg transition ${
              periodo === 'anio' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Año 2026
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpiList.map((kpi, idx) => (
          <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  KPI #{idx + 1}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  kpi.cumple ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {kpi.cumple ? 'Meta Cumplida' : 'Requiere Atención'}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug">{kpi.nombre}</h3>
              <p className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100">
                {kpi.formula}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Resultado Actual</span>
                  <span className="text-xl font-extrabold text-blue-950 font-mono tabular-nums">{kpi.actual}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Meta Definida</span>
                  <span className="text-xs font-bold text-slate-700">{kpi.meta}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${kpi.cumple ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(kpi.progreso, 100)}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-600 italic pt-1">
                {kpi.utilidad}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Collaborator Performance Table */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Desempeño y Carga Operativa por Colaborador</h3>
            <p className="text-xs text-slate-500">Distribución de casos asignados, atendidos y tasa de cierre oportuno</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Funcionario / Colaborador</th>
                <th className="py-2.5 px-3">Cargo Institucional</th>
                <th className="py-2.5 px-3">Casos Asignados</th>
                <th className="py-2.5 px-3">Solucionados</th>
                <th className="py-2.5 px-3">En Gestión</th>
                <th className="py-2.5 px-3">Tasa de Oportunidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {collaboratorStats.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{c.nombre}</td>
                  <td className="py-2.5 px-3 text-slate-500">{c.cargo}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{c.total}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-emerald-700 font-semibold">{c.solved}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums text-amber-700">{c.pending}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">
                    <span className="font-bold text-blue-900">{c.rate}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
