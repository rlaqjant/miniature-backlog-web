import { create } from 'zustand'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

interface Modal {
  id: string
  isOpen: boolean
  data?: unknown
}

interface UIState {
  /** 사이드바 열림 상태 */
  isSidebarOpen: boolean
  /** 현재 활성화된 토스트 목록 */
  toasts: Toast[]
  /** 모달 상태 */
  modals: Record<string, Modal>
  /** 전역 로딩 상태 */
  isGlobalLoading: boolean
}

interface UIActions {
  /** 사이드바 토글 */
  toggleSidebar: () => void
  /** 사이드바 열기/닫기 */
  setSidebarOpen: (isOpen: boolean) => void
  /** 토스트 추가 */
  addToast: (toast: Omit<Toast, 'id'>) => void
  /** 토스트 제거 */
  removeToast: (id: string) => void
  /** 모달 열기 */
  openModal: (id: string, data?: unknown) => void
  /** 모달 닫기 */
  closeModal: (id: string) => void
  /** 전역 로딩 설정 */
  setGlobalLoading: (loading: boolean) => void
}

type UIStore = UIState & UIActions

/**
 * UI 상태 관리 스토어
 * 토스트, 모달, 사이드바 등 전역 UI 상태
 */
export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  toasts: [],
  modals: {},
  isGlobalLoading: false,

  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
  },

  setSidebarOpen: (isOpen) => {
    set({ isSidebarOpen: isOpen })
  },

  addToast: (toast) => {
    const id = crypto.randomUUID()
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))

    // 자동 제거 타이머
    const duration = toast.duration ?? 3000
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, duration)
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },

  openModal: (id, data) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [id]: { id, isOpen: true, data },
      },
    }))
  },

  closeModal: (id) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [id]: { ...state.modals[id], isOpen: false },
      },
    }))
  },

  setGlobalLoading: (loading) => {
    set({ isGlobalLoading: loading })
  },
}))
