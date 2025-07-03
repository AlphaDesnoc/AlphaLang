import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../../firebase/auth';
import { PermissionService } from '../../firebase/permissions';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requireAdmin?: boolean;
  requireOwner?: boolean;
  fallback?: React.ReactNode;
}

export function PermissionGuard({ 
  children, 
  requiredRole, 
  requireAdmin = false, 
  requireOwner = false, 
  fallback 
}: PermissionGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback || <div className="text-red-400">Accès refusé : utilisateur non connecté</div>;
  }

  // Vérifier les permissions spécifiques
  if (requireOwner && !PermissionService.isOwner(user.role)) {
    return fallback || (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
        <h3 className="text-red-200 font-semibold mb-2">Accès refusé</h3>
        <p className="text-red-200/80">Seuls les propriétaires peuvent accéder à cette fonctionnalité.</p>
      </div>
    );
  }

  if (requireAdmin && !PermissionService.canAccessAdmin(user.role)) {
    return fallback || (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
        <h3 className="text-red-200 font-semibold mb-2">Accès refusé</h3>
        <p className="text-red-200/80">Permissions administrateur requises.</p>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return fallback || (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
        <h3 className="text-red-200 font-semibold mb-2">Accès refusé</h3>
        <p className="text-red-200/80">Rôle requis : {requiredRole}</p>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook personnalisé pour vérifier les permissions
export function usePermissions() {
  const { user } = useAuth();

  return {
    user,
    isOwner: user ? PermissionService.isOwner(user.role) : false,
    isAdmin: user ? PermissionService.canAccessAdmin(user.role) : false,
    canManageUsers: user ? PermissionService.canManageUsers(user.role) : false,
    hasRole: (role: UserRole) => user?.role === role,
  };
}
