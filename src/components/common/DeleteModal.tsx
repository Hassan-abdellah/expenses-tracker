import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";

import {
  Fragment,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

const DeleteModal = ({
  modalTitle,
  modalDescription,
  trigger,
  onDelete,
}: {
  modalTitle: string;
  modalDescription: string;
  trigger: (setOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Fragment>
      {/* Render the trigger with click handler */}
      {trigger(setOpen)}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-white border-0 px-0">
          <AlertDialogHeader className="flex flex-col sm:group-data-[size=default]/alert-dialog-content:place-items-center">
            <AlertDialogMedia className="bg-pink-purple/10 w-10 h-10">
              <Trash2Icon className="text-pink-purple w-7 h-7" />
            </AlertDialogMedia>

            <AlertDialogTitle className="text-center">
              {modalTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>{modalDescription}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="border-t border-gray-100 pt-4 px-4">
            <AlertDialogAction
              variant="outline"
              className="cursor-pointer bg-pink-purple text-white rounded-md px-4 py-2 transition-colors duration-350 hover:bg-pink-purple/80 hover:text-white"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>

            <AlertDialogCancel
              className="cursor-pointer bg-muted-black text-white rounded-md px-4 py-2 transition-colors duration-350 hover:bg-gray-900 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

export default DeleteModal;
