import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import React from "react";

const DashCard = ({ title, icon, color, count, tooltip }) => {
  return (
    <Card className="max-w-fit">
      <Flex className="space-x-6">
        <Icon
          icon={icon}
          color={color}
          className={`text-${color}`}
          variant="solid"
          tooltip={tooltip}
          size="lg"
        />
        <div>
          <Text>{title}</Text>
          <Metric>{count}</Metric>
        </div>
      </Flex>
    </Card>
  );
};

export default DashCard;
