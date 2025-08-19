import { useState, useLayoutEffect, Dispatch, SetStateAction } from 'react';

type UseSessionStorageReturn<T> = [T, Dispatch<SetStateAction<T>>];
 

/**
 * 一个与 useState 类似但将状态持久化到 sessionStorage 的 hook。
 * @param key - 在 sessionStorage 中存储的键名。
 * @param initialValue - 如果 sessionStorage 中没有值，则使用的初始值。
 * @returns 返回一个状态值和一个更新该值的函数，API 与 useState 完全相同。
 */
export function useSessionStorage2<T>(key: string, initialValue: T): UseSessionStorageReturn<T> {
  // 1. 定义一个函数来从 sessionStorage 获取初始值
  //    使用 useState 的惰性初始化（传入一个函数），这样这个逻辑只会在组件首次渲染时执行一次，提高性能。
  const [storedValue, setStoredValue] = useState<T>(() => {
    // 检查是否在浏览器环境中，避免在 SSR (服务器端渲染) 环境下出错
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // 从 sessionStorage 中获取指定 key 的值
      const item = window.sessionStorage.getItem(key);
      // 如果有值，则解析 JSON；如果没有，则返回初始值
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // 如果解析出错，打印错误并返回初始值
      console.error(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // 2. 创建一个新的 setter 函数，它会同时更新 React state 和 sessionStorage
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      // 允许 value 是一个函数，以支持 setState(prev => ...) 这种用法
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // 更新 React state
      setStoredValue(valueToStore);

      // 同样，检查是否在浏览器环境中
      if (typeof window !== 'undefined') {
        // 将新值序列化为 JSON 字符串并存入 sessionStorage
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key “${key}”:`, error);
    }
  };

  // 3. 返回 state 和新的 setter 函数，保持与 useState 一致的 API
  return [storedValue, setValue];
}
/**
 * 一个与 useState 类似但将状态持久化到 sessionStorage 的 hook (SSR 安全版)。
 * @param key - 在 sessionStorage 中存储的键名。
 * @param initialValue - 如果 sessionStorage 中没有值，则使用的初始值。
 * @returns 返回一个状态值和一个更新该值的函数，API 与 useState 完全相同。
 */
export function useSessionStorage<T>(key: string, initialValue: T): UseSessionStorageReturn<T> {
  // 1. 使用 useState，并始终以 initialValue 作为服务器和客户端的初始状态
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 2. 创建一个函数来更新 state 和 sessionStorage
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      // 允许 value 是一个函数，以支持 setState(prev => ...)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key “${key}”:`, error);
    }
  };

  // 3. 使用 useEffect 在客户端挂载后，从 sessionStorage 同步状态
  //    这个 effect 只会在组件挂载时运行一次
  useLayoutEffect(() => {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      console.error(`Error reading sessionStorage key “${key}”:`, error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // 依赖项中只包含 key，确保 key 变化时能重新读取

  return [storedValue, setValue];
}