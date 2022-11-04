import { useRef } from 'react';
import Filter from '../utils/filters';

export const useFilter = (view, appContext) => {
    const { current: filter } = useRef(new Filter(view, appContext));

    return [filter];
};