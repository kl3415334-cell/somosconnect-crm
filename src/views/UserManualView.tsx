/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Platform User Manual (Manual de Usuario) View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  LogIn, 
  UserPlus, 
  FilePlus, 
  Clock, 
  Send, 
  CheckCircle2, 
  BarChart3, 
  HelpCircle,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { exportUserManualToPDF } from '../utils/exportUtils';

export const UserManualView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>('ingreso');

  const manualSections = [
    {
      id: 'ingreso',
      icon: LogIn,
      title: '1. Cómo ingresar a la plataforma e iniciar/cerrar sesión',
      steps: [
        'Abra el navegador web (Chrome, Edge, Safari o Firefox) e ingrese a la dirección autorizada de SomosConnect CRM.',
        'En la esquina superior derecha del encabezado encontrará el "Selector de Sesión y Perfiles", donde podrá seleccionar su rol asignado: Administrador, Gerente, Coordinador, Asesor o Gestor de PQRS.',
        'Para cerrar su sesión o cambiar de dispositivo, presione el ícono de perfil y seleccione "Cerrar sesión" en el módulo de Seguridad.',
        'La plataforma cuenta con cierre preventivo automático ante inactividad prolongada para proteger datos personales según la Ley 1581 de 2012.'
      ]
    },
    {
      id: 'registro_usuario',
      icon: UserPlus,
      title: '2. Cómo registrar y buscar un usuario o beneficiario',
      steps: [
        'Diríjase al menú lateral y seleccione "Gestión de Usuarios".',
        'Haga clic en el botón azul "Nuevo Usuario" ubicado en la parte superior.',
        'Diligencie el formulario con los nombres completos, tipo de documento (CC, CE, TI, Pasaporte, NIT), número de documento, correo y celular.',
        'Verifique que la casilla de autorización de la Ley 1581 de 2012 (Habeas Data) esté marcada por el usuario.',
        'Haga clic en "Guardar Usuario". El sistema validará que no existan documentos duplicados.',
        'Para consultar el historial de un usuario, selecciónelo de la tabla: se desplegará su expediente con todas las PQRS vinculadas.'
      ]
    },
    {
      id: 'crear_pqrs',
      icon: FilePlus,
      title: '3. Cómo radicar y clasificar una solicitud PQRS',
      steps: [
        'Haga clic en "Nueva PQRS" en la barra superior o en el botón del módulo de PQRS.',
        'Seleccione el usuario beneficiario que presenta el trámite (puede buscarlo por nombre o cédula).',
        'Seleccione el tipo de trámite: Petición, Queja, Reclamo, Sugerencia, Felicitación o Solicitud de Información.',
        'El sistema computará automáticamente el término legal en días hábiles (10, 15 o 30 días) y la fecha límite exacta según la Ley 1755 de 2015.',
        'Seleccione el canal de recepción: WhatsApp, Correo electrónico, PBX, Web o Presencial.',
        'Describa con precisión los hechos y adjunte soportes documentales en PDF si existen.',
        'Haga clic en "Radicar Solicitud". El sistema generará un número consecutivo oficial e inmutable (ej. PQRS-2026-001).'
      ]
    },
    {
      id: 'asignacion_seguimiento',
      icon: Clock,
      title: '4. Cómo asignar responsables y registrar trazabilidad',
      steps: [
        'En la bandeja de PQRS, haga clic sobre el radicado para abrir el expediente.',
        'Si cuenta con rol de Coordinador, Gerente o Administrador, podrá reasignar el caso al colaborador y área competente.',
        'En la pestaña "Trazabilidad", redacte cada llamada, diligencia, visita comunitaria u oficio realizado y presione "Registrar".',
        'Cada actuación queda sellada con fecha, hora exacta, nombre del funcionario y cargo para garantizar auditoría inmutable.'
      ]
    },
    {
      id: 'respuesta_cierre',
      icon: CheckCircle2,
      title: '5. Cómo registrar respuesta formal y cerrar un caso',
      steps: [
        'Abra el caso y seleccione la pestaña "Emitir Respuesta".',
        'Redacte el texto de la respuesta formal fundamentada en hechos y derecho.',
        'Presione "Enviar y Registrar Respuesta". El estado cambiará a "Respondida".',
        'Una vez se confirme la entrega formal y la ejecución de la solución, ingrese en la sección "Finalizar y Cerrar Solicitud", describa la solución definitiva y presione "Cerrar y Solucionar Caso".',
        'Importante: No cierre ningún caso si aún quedan gestiones pendientes por ejecutar.'
      ]
    },
    {
      id: 'informes_exportacion',
      icon: FileSpreadsheet,
      title: '6. Cómo generar y descargar informes en PDF y Excel',
      steps: [
        'Ingrese al módulo "Informes y Reportes" desde el menú lateral.',
        'Seleccione una de las 13 plantillas oficiales (General, Peticiones, Quejas, Vencidas, Tiempos, Satisfacción, etc.).',
        'Seleccione el rango de fechas deseado (Mes, Trimestre, Año o Histórico).',
        'Presione "Descargar PDF" para obtener un archivo con membrete institucional, tablas y firma ejecutiva.',
        'Presione "Descargar Excel" para obtener una hoja de cálculo estructurada con todos los campos para análisis estadístico.'
      ]
    },
    {
      id: 'indicadores_kpi',
      icon: BarChart3,
      title: '7. Cómo consultar los indicadores de gestión (KPI)',
      steps: [
        'Ingrese al módulo "Indicadores (KPI)".',
        'Consulte en tiempo real el tiempo promedio de respuesta, porcentaje de solicitudes solucionadas, tasa de cumplimiento de términos (SLA) y satisfacción CSAT.',
        'Revise la tabla de desempeño por colaborador para equilibrar cargas de trabajo operativas.'
      ]
    },
    {
      id: 'faq',
      icon: HelpCircle,
      title: '8. Solución de problemas frecuentes (FAQ)',
      steps: [
        '¿Qué hacer si un caso está por vencer? El sistema lo resalta en color rojo en el Dashboard y la bandeja de PQRS. Priorice su respuesta de fondo o emita una comunicación de ampliación de términos motivada antes del vencimiento.',
        '¿Cómo corregir datos de un usuario? En "Gestión de Usuarios", presione el ícono de lápiz en la fila del usuario y modifique los datos necesarios.',
        '¿Se pierden los datos si cierro el navegador? No. Toda la información se almacena localmente de forma persistente y además puede descargar copias de seguridad en formato JSON en el módulo de Seguridad.'
      ]
    }
  ];

  const filteredSections = manualSections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.steps.some(st => st.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Manual de Usuario de la Plataforma</h2>
          <p className="text-xs text-slate-500">
            Guía didáctica completa con instrucciones paso a paso para la operación de SomosConnect CRM.
          </p>
        </div>

        <button
          onClick={exportUserManualToPDF}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Descargar Manual Completo en PDF</span>
        </button>
      </div>

      {/* Search box */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Buscar instrucciones o palabras clave (ej. radicar, cerrar, Excel, plazo)..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 shadow-2xs"
        />
      </div>

      {/* Step by step accordion list */}
      <div className="space-y-3">
        {filteredSections.map(section => {
          const isExpanded = expandedSection === section.id;
          const Icon = section.icon;

          return (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition"
            >
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{section.title}</h3>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  {section.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <span className="w-5 h-5 rounded-full bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed font-medium text-slate-800">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
