const MyButton = ({ btn, title, click }) => {
    return (
      <>
        <button
          onClick={click}
          className={`  px-6 py-2 rounded-md font-semibold shadow-md ${btn}`}
        >
          {title}
        </button>
      </>
    );
  };
  
  export default MyButton;
  