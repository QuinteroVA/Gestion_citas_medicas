import { useEffect, useState } from "react";
import { loadDB, loadDBFromApi, saveDBToApi } from "../lib/db";
import type { DB } from "../types";

/**
 * Hook que gestiona el ciclo de vida de la base de datos:
 * carga inicial desde la API (con fallback a localStorage) y
 * persistencia automática ante cualquier cambio.
 */
export function useDB() {
  const [db, setDb] = useState<DB>(loadDB);
  const [isHydrated, setIsHydrated] = useState(false);

  // Carga inicial desde la API
  useEffect(() => {
    let isMounted = true;
    void loadDBFromApi().then((initialDB) => {
      if (!isMounted) return;
      setDb(initialDB);
      setIsHydrated(true);
    });
    return () => { isMounted = false; };
  }, []);

  // Persistencia automática
  useEffect(() => {
    if (!isHydrated) return;
    void saveDBToApi(db);
  }, [db, isHydrated]);

  return { db, setDb };
}