import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const sourcePages = [
  {
    label: "1 / 2",
    src: `${import.meta.env.BASE_URL}source-pages/source-page-1.jpg`,
  },
  {
    label: "2 / 2",
    src: `${import.meta.env.BASE_URL}source-pages/source-page-2.jpg`,
  },
] as const;

interface TimelineSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimelineSourceModal({
  isOpen,
  onClose,
}: TimelineSourceModalProps) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const activePage = sourcePages[activePageIndex];

  const showPreviousPage = () => {
    setActivePageIndex((currentIndex) =>
      currentIndex === 0 ? sourcePages.length - 1 : currentIndex - 1,
    );
  };

  const showNextPage = () => {
    setActivePageIndex((currentIndex) =>
      currentIndex === sourcePages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="timeline-source-title">
      <div className="source-modal" dir="rtl">
        <header className="source-modal__header">
          <div>
            <h2 id="timeline-source-title">المصدر</h2>
            <span>{activePage.label}</span>
          </div>

          <button
            type="button"
            className="source-modal__icon-button"
            onClick={onClose}
            aria-label="إغلاق"
          >
            <CloseRoundedIcon fontSize="small" />
          </button>
        </header>

        <div className="source-modal__body">
          <button
            type="button"
            className="source-modal__nav source-modal__nav--previous"
            onClick={showPreviousPage}
            aria-label="الصورة السابقة"
          >
            <NavigateNextRoundedIcon />
          </button>

          <a
            className="source-modal__image-link"
            href={activePage.src}
            target="_blank"
            rel="noreferrer"
            aria-label="فتح صورة المصدر في تبويب جديد"
          >
            <img src={activePage.src} alt={`صفحة المصدر ${activePage.label}`} />
            <span>
              <OpenInNewRoundedIcon fontSize="small" />
            </span>
          </a>

          <button
            type="button"
            className="source-modal__nav source-modal__nav--next"
            onClick={showNextPage}
            aria-label="الصورة التالية"
          >
            <NavigateBeforeRoundedIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
}

