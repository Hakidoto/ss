// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from 'next-themes';


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function PieChartSurveys({ data }) {
  const { theme } = useTheme();

  const textColor = theme === 'light' ? 'black' : 'white';
  const tooltipColor = theme === 'light' ? 'white' : 'black';
  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 30, right: 10, bottom: 30, left: 10 }}
        innerRadius={0.3}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={textColor}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        theme={{
          text: {
            "fontSize": 12,
          },
          tooltip: {
            container: {
              background: tooltipColor,
              color: textColor,
            },
          },
          // other Nivo theme props
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
      />
    </>
  );
}
