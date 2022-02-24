import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '.';

export const useRootDispatch = () => useDispatch<RootDispatch>();

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
