import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import React from "react";

const DashCard = ({ title, icon, color, count, tooltip }) => {
  return (
    <Card className="w-[15rem]">
      <Flex className="justify-around">
        <Icon
          icon={icon}
          color={color}
          className={`text-${color}` || 'text-success'}
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