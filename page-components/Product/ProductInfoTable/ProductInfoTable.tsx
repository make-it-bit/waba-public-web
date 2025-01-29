'use client'
import { ReactSVG } from "react-svg";

const ProductInfoTable = () => {
  const tableData = [
    ['', 'Waba Eclatia', 'Traditional LED Masks', 'In-Clinic Treatments', 'Microneedling', 'Radio Frequency', 'Microcurrent', 'IPL (Intense Pulsed Light)'],
    ['Treats Both Face and Body', 'check-stroke', '-', 'check', 'check', 'check', 'check', 'check'],
    ['Zero Damage/Heat Reliance', 'check-stroke', '-', 'Varies', '-', '-', 'check', '-'],
    ['Pain Free', 'check-stroke', 'check', 'Varies', '-', '-', '-', '-'],
    ['No Goggles Required', 'check-stroke', '-', 'Varies', 'check', 'check', 'check', '-'],
    ['Optimized for All Skin Tones', 'check-stroke', '-', 'Varies', 'check', 'check', 'check', '-'],
    ['Zero Risk of Infection', 'check-stroke', 'check', 'Varies', '-', 'check', 'check', 'check'],
    ['No Conductor Gel Required', 'check-stroke', 'check', '-', 'check', '-', '-', '-'],
    ['Quick Treatment Time', 'From 2 min.', '10-30 min.', '30-60 min.', '30-60 min.', '30-60 min.', '10 min.', '20-30 min.'],
    ['Cost-Effective', 'check-stroke', 'check', '-', '-', '-', 'check', '-'],
    ['Convenient At-Home Use', 'check-stroke', 'check', '-', '-', '-', 'check', '-'],
  ];

  return (
    <div className="overflow-x-auto container py-[108px]">
      <div className="flex flex-row pb-10">
        <h2 className="font-rufina text-5xl leading-5xl">The Waba Eclatia Advantage</h2>
      </div>
      <table className="table-auto border border-black-100 w-full">
        <thead>
          <tr className="bg-white border-b border-black-100">
            {tableData[0].map((header, index) => (
              <th
                key={index}
                className="p-5 text-sm text-left font-normal"
              >
                {header || ' '}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-white" : "bg-[#F3ECEE80]"
              }`}
            >
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-5 text-sm ${
                    colIndex === 0 ? "text-left" : "text-center"
                  } ${colIndex === 1 ? "bg-[#F3ECEE] bg-opacity-80" : ""}`}
                >
                  {cell === 'check-stroke' ? (
                    <ReactSVG src="icons/check-stroke.svg" className="inline-block" />
                  ) : cell === 'check' ? (
                    <ReactSVG src="icons/checkmark.svg" className="inline-block" />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductInfoTable;
