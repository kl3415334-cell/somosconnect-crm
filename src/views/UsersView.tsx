/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Users Management View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  History, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Check, 
  X,
  FileText
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { CRMUser, TipoUsuario, EstadoAtencionUsuario, SolicitudPQRS } from '../types';
import { exportUsersToExcel } from '../utils/exportUtils';

interface UsersViewProps {
  onOpenNewUser: () => void;
  onOpenNewTicketForUser: (userId: string) => void;
  onSelectTicket: (ticket: SolicitudPQRS) => void;
  onRequestDeleteUser: (user: CRMUser) => void;
}

export const UsersView: React.FC<UsersViewProps> = ({
  onOpenNewUser,
  onOpenNewTicketForUser,
  onSelectTicket,
  onRequestDeleteUser
}) => {
  const { users, pqrs, updateUser, currentUser } = useCRM();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [selectedUser, setSelectedUser] = useState<CRMUser | null>(null);
  const [editingUser, setEditingUser] = useState<CRMUser | null>(null);

  // Filtered users list
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      user.nombre.toLowerCase().includes(query) ||
      user.documento.includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.ciudad.toLowerCase().includes(query);

    const matchesType = filterType === 'todos' || user.tipoUsuario === filterType;
    const matchesStatus = filterStatus === 'todos' || user.estadoAtencion === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // User PQRS history
  const getUserTickets = (userId: string) => {
    return pqrs.filter(p => p.userId === userId);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUser(editingUser.id, editingUser);
    setEditingUser(null);
    if (selectedUser?.id === editingUser.id) {
      setSelectedUser(editingUser);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestión de Usuarios</h2>
          <p className="text-xs text-slate-500">
            Directorio de beneficiarios, afiliados, aliados y proveedores de la Corporación Social Somos Uno.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportUsersToExcel(users)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Exportar Excel</span>
          </button>
          <button
            onClick={onOpenNewUser}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, documento de identidad, correo o ciudad..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos los tipos de usuario</option>
            <option value="Beneficiario">Beneficiarios</option>
            <option value="Afiliado">Afiliados / Voluntarios</option>
            <option value="Aliado">Aliados Estratégicos</option>
            <option value="Proveedor">Proveedores</option>
            <option value="Comunidad General">Comunidad General</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Al día">Al día</option>
            <option value="En atención">En atención</option>
            <option value="Con solicitud pendiente">Con solicitud pendiente</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Table + User Profile Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Column */}
        <div className={`space-y-4 ${selectedUser ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Usuario / Beneficiario</th>
                    <th className="py-3 px-3">Documento</th>
                    <th className="py-3 px-3">Contacto</th>
                    <th className="py-3 px-3">Tipo</th>
                    <th className="py-3 px-3">Estado</th>
                    <th className="py-3 px-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No se encontraron usuarios que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(user => {
                      const userTickets = getUserTickets(user.id);
                      const isSelected = selectedUser?.id === user.id;

                      return (
                        <tr 
                          key={user.id} 
                          className={`hover:bg-slate-50 transition cursor-pointer ${isSelected ? 'bg-blue-50/60' : ''}`}
                          onClick={() => setSelectedUser(user)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                                {user.nombre.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 truncate">{user.nombre}</p>
                                <p className="text-[11px] text-slate-500">{user.ciudad}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono tabular-nums text-slate-800">
                            {user.tipoDocumento} {user.documento}
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            <p className="truncate max-w-[130px]">{user.telefono}</p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[130px]">{user.email}</p>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[11px] font-medium text-slate-700 px-2 py-0.5 rounded-md bg-slate-100">
                              {user.tipoUsuario}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              user.estadoAtencion === 'Al día' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              user.estadoAtencion === 'Con solicitud pendiente' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {user.estadoAtencion}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedUser(user)}
                                title="Ver expediente e historial"
                                className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition"
                              >
                                <History className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingUser(user)}
                                title="Editar información"
                                className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              {currentUser.permisos.canDelete && (
                                <button
                                  onClick={() => onRequestDeleteUser(user)}
                                  title="Eliminar usuario (con clave)"
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected User Detail Drawer */}
        {selectedUser && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Perfil del Usuario</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
                {selectedUser.nombre.charAt(0)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-sm leading-tight truncate">
                  {selectedUser.nombre}
                </h4>
                <p className="text-xs text-blue-700 font-semibold mt-0.5">
                  {selectedUser.tipoUsuario} · {selectedUser.ciudad}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {selectedUser.tipoDocumento} {selectedUser.documento}
                </p>
              </div>
            </div>

            {/* Quick Actions for Selected User */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onOpenNewTicketForUser(selectedUser.id)}
                className="flex-1 py-1.5 px-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Radicar PQRS</span>
              </button>
              <button
                onClick={() => setEditingUser(selectedUser)}
                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
              >
                Editar
              </button>
            </div>

            {/* Contact details */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{selectedUser.telefono}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{selectedUser.direccion}, {selectedUser.ciudad}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800 text-[11px] pt-1 border-t border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Habeas Data Ley 1581: Consentimiento registrado</span>
              </div>
            </div>

            {/* PQRS History */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Historial de PQRS ({getUserTickets(selectedUser.id).length})
                </span>
              </div>

              {getUserTickets(selectedUser.id).length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">
                  No registra solicitudes radicadas hasta el momento.
                </p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {getUserTickets(selectedUser.id).map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => onSelectTicket(ticket)}
                      className="p-2.5 bg-slate-50 hover:bg-blue-50/70 rounded-xl border border-slate-200 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-xs text-blue-900">{ticket.consecutivo}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{ticket.fechaRecepcion}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 line-clamp-1">
                        {ticket.tipo}: {ticket.descripcion}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-slate-500">{ticket.canalRecepcion}</span>
                        <span className="font-semibold text-blue-700">{ticket.estado}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Inline Edit Modal if Editing */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Editar Información del Usuario</h3>
              <button onClick={() => setEditingUser(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={editingUser.nombre}
                  onChange={e => setEditingUser({ ...editingUser, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    required
                    value={editingUser.telefono}
                    onChange={e => setEditingUser({ ...editingUser, telefono: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tipo de Usuario</label>
                  <select
                    value={editingUser.tipoUsuario}
                    onChange={e => setEditingUser({ ...editingUser, tipoUsuario: e.target.value as TipoUsuario })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="Beneficiario">Beneficiario</option>
                    <option value="Afiliado">Afiliado</option>
                    <option value="Aliado">Aliado</option>
                    <option value="Proveedor">Proveedor</option>
                    <option value="Comunidad General">Comunidad General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estado de Atención</label>
                  <select
                    value={editingUser.estadoAtencion}
                    onChange={e => setEditingUser({ ...editingUser, estadoAtencion: e.target.value as EstadoAtencionUsuario })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Al día">Al día</option>
                    <option value="En atención">En atención</option>
                    <option value="Con solicitud pendiente">Con solicitud pendiente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dirección y Ciudad</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={editingUser.direccion}
                    onChange={e => setEditingUser({ ...editingUser, direccion: e.target.value })}
                    placeholder="Dirección"
                    className="col-span-2 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={editingUser.ciudad}
                    onChange={e => setEditingUser({ ...editingUser, ciudad: e.target.value })}
                    placeholder="Ciudad"
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
