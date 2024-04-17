
export const renderErrors = (errors: string | undefined) => {
  return errors ? (
    <span className="text-red-600 block mb-1">
      {errors}
    </span>
  ) : null;
};