const FormErrorMessage = ({ error }: { error: string | undefined }) => {
  return (
    <>
      {error ? (
        <p
          data-slot="form-message"
          id={error}
          className="text-lightRed text-xs"
        >
          {error}
        </p>
      ) : null}
    </>
  );
};

export default FormErrorMessage;
