import { useAppSelector } from "../../app/hooks";
import { selectActions } from "../../features/actions/actionsSlice";
import { selectSettings } from "../../features/settings/settingsSlice";
import { CardInfo } from "../../components/balancesheets/types";
import { validatorsById } from "./validationData";

interface ValidationObject {
  error: boolean;
  errorMessage: string;
  disabled: boolean;
}

export function useValidator(
  action: string,
  bank: CardInfo,
  amount?: number,
  selectedBank?: string
): ValidationObject {
  const { currentLectureId } = useAppSelector(selectActions);
  const { overdraft, reserveRequirement } = useAppSelector(selectSettings);

  return validatorsById[currentLectureId][bank.cardInfo.type][action](
    bank,
    amount,
    selectedBank,
    overdraft,
    reserveRequirement
  );
}
