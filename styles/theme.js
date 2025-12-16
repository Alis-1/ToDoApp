// Teemat ja värit sovellukselle
export const theme = {
  colors: {
    primary: '#6366f1', // Indigo-500 - modernimpi ja ammattimaisempi
    primaryDark: '#4f46e5', // Indigo-600
    primaryLight: '#818cf8', // Indigo-400
    primaryGradient: ['#6366f1', '#8b5cf6'], // Gradient värit
    secondary: '#10b981', // Emerald-500
    background: '#ffffff',
    surface: '#f8fafc', // Slate-50 - pehmeämpi tausta
    surfaceElevated: '#ffffff',
    error: '#ef4444', // Red-500
    errorLight: '#fee2e2', // Red-100
    text: '#1e293b', // Slate-800 - parempi kontrasti
    textSecondary: '#64748b', // Slate-500
    textDisabled: '#94a3b8', // Slate-400
    border: '#e2e8f0', // Slate-200
    success: '#10b981', // Emerald-500
    successLight: '#d1fae5', // Emerald-100
    warning: '#f59e0b', // Amber-500
    info: '#3b82f6', // Blue-500
    // Dark mode colors
    dark: {
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      border: '#333333',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    xl: {
      shadowColor: '#6366f1',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 12,
    },
  },
};

export default theme;

