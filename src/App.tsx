import { Header } from './components/Header';
import { CalendarView } from './components/CalendarView';
import { PDFExport } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import { useAppSelector } from './shared/globalState/hooks';
import { monthArray } from './shared/data';

function App() {
  const pdfExportComponent = useRef<PDFExport>(null);
  const { monthVisible } = useAppSelector(state => state.calendar);

  const handleExportWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <>
      <Header handlePdfExport={handleExportWithComponent} />

      <PDFExport
        ref={pdfExportComponent}
        paperSize='auto'
        margin={20}
        fileName={`Calendar for ${monthArray[monthVisible]} 2024`}
      >
        <CalendarView />
      </PDFExport>
    </>
  )
}

export default App;
