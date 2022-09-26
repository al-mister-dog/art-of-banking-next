import { useRef } from "react";
import { useAppSelector } from "../app/hooks";
import { selectLectures } from "../features/lectures/lecturesSlice";

export default function useColorSettings(balance: number) {
  const { currentLectureId } = useAppSelector(selectLectures);
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
