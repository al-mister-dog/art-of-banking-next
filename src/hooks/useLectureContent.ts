import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setActions } from "../features/actions/actionsSlice";
import { setup } from "../features/banks/banksSlice";
import { refreshSettings } from "../features/settings/settingsSlice";

export function useLectureContent(id: unknown) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setup({ id }));
    dispatch(setActions({ id }));
    dispatch(refreshSettings());
  }, []);
}
