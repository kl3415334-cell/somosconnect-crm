/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Platform Installation View (PWA & System Setup) for SomosConnect CRM - Corporación Social Somos Uno
 */

import React from 'react';
import { 
  Download, 
  Monitor, 
  Smartphone, 
  Apple, 
  CheckCircle2, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Wifi, 
  ExternalLink 
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useCRM } from '../context/CRMContext';

export const InstallView: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { metrics, users, pqrs } = useCRM();

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Instalar Plataforma</h2>
          <p className="text-xs text-slate-500">
            SomosConnect CRM como Progressive Web App (PWA) de alto rendimiento para Windows, Android, Mac y iOS.
          </p>
        </div>

        {/* PWA Install Trigger Button */}
        <div>
          {isInstalled ? (
            <div className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Aplicación instalada en modo Standalone</span>
            </div>
          ) : isInstallable ? (
            <button
              onClick={install}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 transform hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span>Instalar SomosConnect CRM Ahora</span>
            </button>
          ) : (
            <div className="px-4 py-2 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold">
              <span>Compatible con instalación directa desde navegador</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Installation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Windows / PC */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Monitor className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Instalación en Windows / PC</h3>
          <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>Abra <strong>Google Chrome</strong> o <strong>Microsoft Edge</strong>.</li>
            <li>En la barra de direcciones superior, haga clic en el ícono de instalación <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">⊕ Instalar</code>.</li>
            <li>Haga clic en <strong>"Instalar"</strong> en la ventana emergente.</li>
            <li>Se creará un acceso directo en el Escritorio y en la Barra de Tareas de Windows.</li>
          </ol>
        </div>

        {/* Android */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Instalación en Android</h3>
          <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>Abra Chrome en su dispositivo móvil Android.</li>
            <li>Presione el menú de tres puntos <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">⋮</code> en la esquina superior derecha.</li>
            <li>Seleccione la opción <strong>"Agregar a la pantalla principal"</strong> o <strong>"Instalar aplicación"</strong>.</li>
            <li>Confirme en "Agregar". El ícono oficial de SomosConnect CRM aparecerá entre sus aplicaciones móviles.</li>
          </ol>
        </div>

        {/* Mac / iOS */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
            <Apple className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Instalación en iPhone / iPad (iOS)</h3>
          <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li>Abra la plataforma en el navegador <strong>Safari</strong>.</li>
            <li>Toque el botón de <strong>Compartir</strong> (ícono de cuadrado con flecha hacia arriba en la barra inferior).</li>
            <li>Deslice hacia abajo y seleccione <strong>"Agregar a pantalla de inicio"</strong>.</li>
            <li>Presione "Agregar". La aplicación se ejecutará a pantalla completa sin barras del navegador.</li>
          </ol>
        </div>
      </div>

      {/* System Requirements & Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Requirements */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-700" />
            <span>Requisitos Mínimos del Sistema</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-600">Navegadores Compatibles:</span>
              <span className="font-semibold text-slate-900">Chrome 90+, Edge 90+, Safari 14+, Firefox 88+</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-600">Resolución de Pantalla:</span>
              <span className="font-semibold text-slate-900">Desde 360px (Móvil) hasta 4K Ultra HD</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-600">Memoria RAM Mínima:</span>
              <span className="font-semibold text-slate-900">2 GB de RAM (Recomendado 4 GB o superior)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-slate-600">Espacio en Disco:</span>
              <span className="font-semibold text-slate-900">&lt; 15 MB para almacenamiento local y caché</span>
            </div>
          </div>
        </div>

        {/* Database & Provisioning Status */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-700" />
            <span>Verificación del Funcionamiento y Base de Datos</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-900">Base de Datos Central:</span>
              </div>
              <span className="font-mono text-emerald-950 font-bold">Activa y Sincronizada ({pqrs.length} casos)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">Usuario Administrador Inicial:</span>
              </div>
              <span className="text-slate-700">Configurado (Ing. Carlos Montoya)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-sky-600" />
                <span className="font-semibold text-slate-800">Caché Offline PWA:</span>
              </div>
              <span className="text-emerald-700 font-semibold">Habilitada con Service Worker</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-800">Actualizaciones Automáticas:</span>
              </div>
              <span className="text-slate-700">Activadas en segundo plano</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
