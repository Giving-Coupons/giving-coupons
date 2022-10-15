import { campaignImageBase64, logoBase64 } from '../../utils/examples';

const makeMockCampaignCharity = (id: number) => {
  const totalAmount = Math.floor(Math.random() * 1000);
  const amount1 = Math.floor(Math.random() * totalAmount);
  const amount2 = totalAmount - amount1;
  return {
    id: 1,
    charity: {
      id: 1,
      name: `Charity ${id}`,
      logoBase64: logoBase64,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet accumsan dolor. Sed fermentum ex neque, sit amet dapibus ante rutrum non.',
      websiteUrl: 'https://www.foodfromtheheart.org',
      imageBase64: campaignImageBase64,
    },
    givingSgUrl: 'https://www.giving.sg/charities/food-from-the-heart',
    primaryDonor: {
      amount: amount1,
      fraction: amount1 / totalAmount,
    },
    secondaryDonors: {
      amount: amount2,
      fraction: amount2 / totalAmount,
    },
  };
};

export const makeMockCampaign = () => {
  const charities = [
    makeMockCampaignCharity(1),
    makeMockCampaignCharity(2),
    makeMockCampaignCharity(3),
    makeMockCampaignCharity(4),
    makeMockCampaignCharity(5),
  ];

  const totalPrimaryDonorAmount = charities.reduce((acc, curr) => acc + curr.primaryDonor.amount, 0);
  const totalSecondaryDonorAmount = charities.reduce((acc, curr) => acc + curr.secondaryDonors.amount, 0);
  const totalAmount = totalPrimaryDonorAmount + totalSecondaryDonorAmount;

  return {
    id: 1,
    name: 'NUS Giving 2022',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    promisedAmount: 5000,
    couponDenomination: 10,
    start: new Date(),
    end: new Date(),
    imageBase64: campaignImageBase64,
    primaryDonor: {
      id: 1,
      name: 'NUS',
      email: 'nus@nus.com',
    },
    interestId: 1,
    charities: charities,
    donations: {
      primaryDonor: {
        amount: totalPrimaryDonorAmount,
        fraction: totalPrimaryDonorAmount / totalAmount,
      },
      secondaryDonors: {
        amount: totalSecondaryDonorAmount,
        fraction: totalSecondaryDonorAmount / totalAmount,
      },
    },
  };
};
