import { useRef } from "react";
import { useAppSelector } from "../app/hooks";
import { selectActions } from "../features/actions/actionsSlice";

export default function useColorSettings(balance: number) {
  const { currentLectureId } = useAppSelector(selectActions);
  const prevBalance = useRef(balance);
  const prevClass = useRef("text");
  const prevLectureId = useRef(currentLectureId);

  if (balance !== prevBalance.current) {
    if (balance > prevBalance.current) {
      prevClass.current = "increase";
    }
    if (balance < prevBalance.current) {
      prevClass.current = "decrease";
    }
    prevBalance.current = balance;
  }

  if (currentLectureId !== prevLectureId.current) {
    prevClass.current = "text";
    prevLectureId.current = currentLectureId;
  }

  return prevClass.current;
}

function useColorSettingsRound(balance: number) {
  const { currentLectureId } = useAppSelector(selectActions);
  const prevBalance = useRef(balance);
  const prevClass = useRef("text");
  const prevLectureId = useRef(currentLectureId);

  if (balance !== prevBalance.current) {
    if (balance > prevBalance.current) {
      prevClass.current = "increase";
    }
    if (balance < prevBalance.current) {
      prevClass.current = "decrease";
    }
    prevBalance.current = balance;
  }

  if (currentLectureId !== prevLectureId.current) {
    prevClass.current = "text";
    prevLectureId.current = currentLectureId;
  }

  return prevClass.current;
}

/**
 * if the balance has changed we want to display this with a color
 * if balance has increased color changes green
 * if balance has decreased color changes red
 * then previous balance is set to current balance
 * if no change has occured th previous balance does not need to be set
 */
