import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { selectActions } from "../features/actions/actionsSlice";

export function useCurrentAction(actions, currentAction, setAction) {
  const { currentLectureId } = useAppSelector(selectActions);

  const actionInActions = Object.keys(actions)
    .flatMap((acn) => actions[acn])
    .find((acn) => acn.value === currentAction.current);

  if (currentAction.current !== null && actionInActions === undefined) {
    currentAction.current = null;
    setAction(null);
  }

  useEffect(() => {
    setAction(null);
  }, [currentLectureId]);
}
