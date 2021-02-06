import { useCallback } from "react";

const formatDate = useCallback((date: string): string => {
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const newDate = new Date(date);

  return `${months[newDate.getMonth()]}, ${newDate.getFullYear()}`;
}, [])

const sortByDate = useCallback((a:string, b: string): number => {
  return new Date(a).valueOf() - new Date(b).valueOf();
}, [])

export { formatDate, sortByDate };