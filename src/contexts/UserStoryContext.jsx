import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  userStories: [
    { id: 1, title: "Login de usuário", status: "Em progresso", priority: "Alta" },
    { id: 2, title: "Dashboard principal", status: "Concluído", priority: "Alta" },
    { id: 3, title: "Relatórios financeiros", status: "Pendente", priority: "Média" },
    { id: 4, title: "Configurações de perfil", status: "Em progresso", priority: "Baixa" },
  ],
  loading: false,
  error: null
};

// Action types
export const USER_STORY_ACTIONS = {
  ADD_STORY: 'ADD_STORY',
  UPDATE_STORY: 'UPDATE_STORY',
  DELETE_STORY: 'DELETE_STORY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Reducer
const userStoryReducer = (state, action) => {
  switch (action.type) {
    case USER_STORY_ACTIONS.ADD_STORY:
      return {
        ...state,
        userStories: [...state.userStories, action.payload]
      };
    case USER_STORY_ACTIONS.UPDATE_STORY:
      return {
        ...state,
        userStories: state.userStories.map(story =>
          story.id === action.payload.id ? action.payload : story
        )
      };
    case USER_STORY_ACTIONS.DELETE_STORY:
      return {
        ...state,
        userStories: state.userStories.filter(story => story.id !== action.payload)
      };
    case USER_STORY_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case USER_STORY_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Context
const UserStoryContext = createContext();

// Provider
export const UserStoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userStoryReducer, initialState);

  return (
    <UserStoryContext.Provider value={{ state, dispatch }}>
      {children}
    </UserStoryContext.Provider>
  );
};

// Hook
export const useUserStories = () => {
  const context = useContext(UserStoryContext);
  if (!context) {
    throw new Error('useUserStories must be used within a UserStoryProvider');
  }
  return context;
};
