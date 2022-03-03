import React, { useEffect, useState } from 'react';
import { updateLevel } from '../../../store/reducers/gameReducer';
import { useAppDispatch } from '../../../utils/helpers/appHooks';
import cl from './UnitMenuItem.module.scss';

interface IProps {
  unitNum: string;
  currentUnit: number;
  setUnit: React.Dispatch<React.SetStateAction<number>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  resetHardUnit: React.Dispatch<React.SetStateAction<boolean>>;
}

function UnitMenuItem({ currentUnit, unitNum, setUnit, setPageNum, resetHardUnit }: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [classes, setClasses] = useState([cl.button].join(' '));

  useEffect(() => {
    if (currentUnit === Number(unitNum) - 1) {
      setClasses([cl.button, cl.paintedBtn].join(' '));
    } else {
      setClasses([cl.button].join(' '));
    }
  }, [currentUnit]);

  return (
    <button
      className={classes}
      type="button"
      onClick={() => {
        resetHardUnit(false);
        setPageNum(0);
        dispatch(updateLevel(Number(unitNum) - 1));
        setUnit(Number(unitNum) - 1);
      }}
    >
      {unitNum ? `Часть ${unitNum}` : 'Сложные слова'}
    </button>
  );
}

export default UnitMenuItem;
