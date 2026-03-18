import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Spinner } from "../ui/spinner";

const LoadingModal = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false} className="m-0 p-0">
        <DialogHeader className="p-4 border-b border-gray-100">
          <DialogTitle>Loading ...</DialogTitle>
        </DialogHeader>

        <div className="text-muted-black flex items-center gap-2 p-4">
          <Spinner className="size-8" />
          <p>
            Please Wait until we finish validating your request! <br />
            it may take seconds
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;
