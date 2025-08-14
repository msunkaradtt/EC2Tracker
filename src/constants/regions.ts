// src/constants/regions.ts
export interface Region {
    name: string;
    code: string;
  }
  
  export interface RegionGroup {
    title: string;
    data: Region[];
  }
  
  export const REGION_GROUPS: RegionGroup[] = [
    {
      title: 'United States',
      data: [
        { name: 'N. Virginia', code: 'us-east-1' },
        { name: 'Ohio', code: 'us-east-2' },
        { name: 'N. California', code: 'us-west-1' },
        { name: 'Oregon', code: 'us-west-2' },
      ],
    },
    {
      title: 'Asia Pacific',
      data: [
        { name: 'Mumbai', code: 'ap-south-1' },
        { name: 'Osaka', code: 'ap-northeast-3' },
        { name: 'Singapore', code: 'ap-southeast-1' },
        { name: 'Sydney', code: 'ap-southeast-2' },
        { name: 'Tokyo', code: 'ap-northeast-1' },
      ],
    },
    {
      title: 'Europe',
      data: [
        { name: 'Frankfurt', code: 'eu-central-1' },
        { name: 'Ireland', code: 'eu-west-1' },
        { name: 'London', code: 'eu-west-2' },
        { name: 'Paris', code: 'eu-west-3' },
        { name: 'Stockholm', code: 'eu-north-1' },
      ],
    },
    // Add other groups like Canada, South America as needed
];