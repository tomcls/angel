import { useRef } from 'react';
import Translation from '../utils/translation';

export const useTranslation = (lang) => {
    const { current: lg } = useRef(new Translation(lang));

    return [lg];
};