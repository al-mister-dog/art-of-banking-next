import { Center, Title } from "@mantine/core";
import Text from "../../../components/articles/texts/Text";
import CpiPrice from "../../../components/articles/inflation/cpi/cpi-price";
import CpiWeight from "../../../components/articles/inflation/cpi/cpi-weight";
import CpiPriceWeight from "../../../components/articles/inflation/cpi/cpi-price-weight";
import { IndentDecrease } from "tabler-icons-react";

export default function CPI() {
  return (
    <>
      <Center>
        <Title order={1}>Consumer Price Index</Title>
      </Center>
      <Text>
        Inflation can be described the decline of purchasing power of a given
        currency over time. A quantitative estimate of the rate at which the
        decline in purchasing power occurs can be reflected in the increase of
        an average price level of a basket of selected goods and services in an
        economy over some period of time (ie. Consumer Price Index or CPI)
      </Text>
      <br></br>
      <Text>
        The Consumer Price Index (CPI) is a measure that examines the weighted
        average of prices of a basket of consumer goods and services, such as
        transportation, food, and medical care. It is calculated by taking price
        changes for each item in the predetermined basket of goods and averaging
        them. Changes in the CPI are used to assess price changes associated
        with the cost of living. The CPI is one of the most frequently used
        statistics for identifying periods of inflation or deflation.
      </Text>
      <br></br>
      <Center>
        <Title order={2}>Price Change</Title>
      </Center>

      <Text>
        Prices may increase for a number of reasons. They can be roughly divided
        into two categories: cost-push and demand-pull. Demand-pull inflation is
        when consumer demand outpaces the available supply of many types of
        consumer goods. Inflation sets in, forcing an overall increase in the
        cost of living. Cost-push inflation is when supply costs rise or supply
        levels fall. Either will drive up prices—as long as demand remains the
        same. Shortages or cost increases in labor, raw materials, and capital
        goods create cost-push inflation.
      </Text>
      <CpiPrice />
      <br></br>
      <Center>
        <Title order={2}>Cpi Weight</Title>
      </Center>
      <Text>
        The weights are based on the relative importance of the product to
        households – for example, if a household spends 8% of their income on
        chocolate, and 25% on transport, the weights would be 8 and 25
        respectively. However this is usually an estimate by economists. At
        moments of structural change, it is the weighting schemes that are used
        to construct price indices that come under pressure. Price index numbers
        are based on the assumption that the proportion of spending on food,
        clothing, housing, travel etc remain relatively constant over time.
        Statisticians face a dilemma as to whether to hold the share of
        different goods in the consumption basket constant, or whether to adjust
        to the new circumstances. Transport spending is down, whereas other
        goods and services are up. Unsurprisingly, the prices for transport
        services are rising less fast than for everything else. If you adjust
        the weights to downgrade the lower level of spending on travel, you
        produce a higher inflation number.
      </Text>
      <CpiWeight />
      <Text>
        In early 2021, a worldwide increase in inflation began to occur. It has
        been attributed to various causes, including pandemic-related fiscal and
        monetary stimulus, supply shortages (including chip shortages and energy
        shortages), price gouging and as of 2022, the Russian invasion of
        Ukraine. Below is a chart showing the rate of change and the inflation
        rate from 2000 to 2020.
      </Text>
      <Text>
        If the bulk of inflation was due solely to price increases (and its
        weighting by economists), how much change must occur to reach the Bank
        of England's estimated peak rate of 11%? And do these prices reflect the
        prices we see today as consumers?
      </Text>
      <CpiPriceWeight />
    </>
  );
}

const formula = `4. Divide the current product price total by the past price total
Write down the total you found after adding up the current and past product prices. Take your current product price sum and divide it by the past price total you came up with. For instance, if your current price total is $216 and your past price total is $176, your equation would be 216 / 176 = 1.23

5. Multiply the total by 100
Once you've gotten a total, multiply it by 100 to create a baseline for the consumer price index. This is the number that makes your total comparable. Using the previous example, your equation is 216 / 176 = 1.23 x 100 = 122.72.

6. Convert this number into a percentage
To find the change in the consumer price index, you'll subtract 100 from this final result. Subtracting 100 allows you to subtract the baseline and see the change in product pricing in the previous years. Place a percentage sign onto your final total. This result is your change in the consumer price index.

Continuing on with the previous example, the equation would be 216 / 176 = 1.23 x 100 = 122.72 -100 = 22.7%. Your final total will represent a 22.7% change in prices from the previous year you've chosen to the current year. Positive numbers represent an inflation rate, while negative numbers would be deflation.`;
