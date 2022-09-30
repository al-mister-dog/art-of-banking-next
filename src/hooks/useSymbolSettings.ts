import { useRef } from "react";
import { useAppSelector } from "../app/hooks";
import { selectActions } from "../features/actions/actionsSlice";

export default function useColorSettings(balance: number) {
  const { currentLectureId } = useAppSelector(selectActions);
  const prevBalance = useRef(balance);
  const prevClass = useRef("");
  const prevLectureId = useRef(currentLectureId);

  if (balance !== prevBalance.current) {
    if (balance > prevBalance.current) {
      prevClass.current = "+";
    }
    if (balance < prevBalance.current) {
      prevClass.current = "-";
    }
    prevBalance.current = balance;
  }

  if (currentLectureId !== prevLectureId.current) {
    prevClass.current = "";
    prevLectureId.current = currentLectureId;
  }

  return prevClass.current;
}
