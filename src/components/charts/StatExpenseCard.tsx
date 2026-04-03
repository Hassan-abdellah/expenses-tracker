import { Card, CardContent } from "@/components/ui/card";

const StatExpenseCard = ({
  cardTitle,
  cardDesrciption,
  cardNumber,
  Icon,
}: {
  cardTitle: string;
  cardDesrciption: string;
  cardNumber: string | number;
  Icon: React.ReactNode;
}) => {
  return (
    <Card className="group">
      <CardContent className="flex items-center justify-between">
        <div>
          <h2 className="md:text-base lg:text-lg text-lg text-muted-black mb-2">
            {cardTitle}
          </h2>
          <div className="md:text-sm  text-base text-gray-400">
            <span>{cardDesrciption}: </span>
            <span>{cardNumber}</span>
          </div>
        </div>

        <div className="bg-green-200 text-white rounded-full w-12 h-12 flex items-center justify-center relative overflow-hidden after:absolute after:left-0 after:top-0 after:bg-gray-50/95 after:opacity-30 after:h-full after:w-5 after:-translate-x-12 after:skew-[-45deg] after:transition-transform after:duration-250 group-hover:after:translate-x-16">
          {Icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatExpenseCard;
