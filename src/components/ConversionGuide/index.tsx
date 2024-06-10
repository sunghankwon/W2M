import docxToMdIcon from "../../assets/d2m.png";

const ConversionGuide = (): JSX.Element => {
  return (
    <div className="w-full pt-20 pb-20 mx-auto mt-40 mb-10 border-t border-b max-w-7xl">
      <h2 className="mb-5 text-2xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
        온라인에서 Word문서를 Markdown 파일로 변환하는 방법
      </h2>
      <p className="mb-10 text-lg text-gray-600 sm:text-xl md:text-2xl lg:text-3xl">
        Docx문서를 Markdown 파일로 변환하려면 아래의 간단한 단계를 따라주세요.
      </p>
      <div className="flex flex-col items-start space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
        <div className="flex-grow">
          <ol className="pl-3 space-y-4 list-decimal">
            <li className="pb-4 text-lg border-t sm:text-lg md:text-xl lg:text-2xl pt-7">
              상단의 회색 영역을 클릭하거나 Docx 파일을 드래그하여 드롭 영역에
              놓습니다.
            </li>
            <li className="pb-4 text-lg border-t sm:text-lg md:text-xl lg:text-2xl pt-7">
              Markdown 포맷으로 변환한 Docx 문서를 선택합니다.
            </li>
            <li className="pb-4 text-lg border-t sm:text-lg md:text-xl lg:text-2xl pt-7">
              W2M이 자동으로 Docx 문서를 MD 파일로 변환합니다.
            </li>
            <li className="pb-4 text-lg border-t sm:text-lg md:text-xl lg:text-2xl pt-7">
              이미지가 포함된 경우 ZIP 파일로, 포함되지 않은 경우 MD 파일로
              다운로드됩니다.
            </li>
            <li className="pb-4 text-lg border-t sm:text-lg md:text-xl lg:text-2xl pt-7">
              변환된 마크다운 파일은 Markdown 에디터를 통해 수정할 수 있습니다.
            </li>
          </ol>
        </div>
        <div className="flex-none w-full sm:w-[35%] mt-10 sm:mt-20">
          <img
            src={docxToMdIcon}
            alt="Convert DOCX to Markdown"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ConversionGuide;
