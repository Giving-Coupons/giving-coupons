# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

c1 = Charity.create!(name: 'Ark', website_url: 'https://www.ark.org', description: 'Placeholder Ark')
c1.logo.attach(io: Rails.root.join('storage', 'charities', 'logos', 'default.png').open, filename: 'default.png',
               content_type: 'image/png')
c2 = Charity.create!(name: 'Bork', website_url: 'https://www.bork.org', description: 'Placeholder Bork')
c3 = Charity.create!(name: 'Creek', website_url: 'https://www.creek.org', description: 'Placeholder Creek')
c4 = Charity.create!(name: 'Dirk', website_url: 'https://www.dirk.org', description: 'Placeholder Dirk')
c5 = Charity.create!(name: 'Erk', website_url: 'https://www.erk.org', description: 'Placeholder Erk')
c6 = Charity.create!(name: 'Fork', website_url: 'https://www.fork.org', description: 'Placeholder Fork')
c7 = Charity.create!(name: 'Gork', website_url: 'https://www.gork.org', description: 'Placeholder Gork')
c8 = Charity.create!(name: 'Hork', website_url: 'https://www.hork.org', description: 'Placeholder Hork')
c9 = Charity.create!(name: 'Irk', website_url: 'https://www.irk.org', description: 'Placeholder Irk')
c10 = Charity.create!(name: 'Jerk', website_url: 'https://www.jerk.org', description: 'Placeholder Jerk')

PrimaryDonor.create!(name: 'Alice Tan', email: 'alicetan@gmail.com')
PrimaryDonor.create!(name: 'Burger Queen', email: 'community@burgerqueen.com')
PrimaryDonor.create!(name: 'Cinnamon', email: 'cinna@mon.com')
PrimaryDonor.create!(name: 'Derek Zoolander', email: 'derek@gmail.com')
PrimaryDonor.create!(name: 'Eddie and Mary Foundation', email: 'contact@jamf.com')

i1 = Interest.create!(donor_name: 'Alice Tan', donor_email: 'alicetan@gmail.com', campaign_name: 'Alice Tan Campaign',
                      campaign_description: 'Alice Tan is raising funds!', promised_amount: 500,
                      start: DateTime.now - 1.month, end: DateTime.now + 1.month, status: 'pending',
                      coupon_denomination: 10, charities: [c1, c2, c3, c4, c5])
i2 = Interest.create!(donor_name: 'Johnny Deep', donor_email: 'johnnydeep@hotmail.com',
                      campaign_name: 'Johnny Deep Campaign', campaign_description: 'Johnny Deep is raising funds!',
                      promised_amount: 1000, start: DateTime.now - 2.months, end: DateTime.now + 3.months,
                      status: 'pending', coupon_denomination: 10, charities: [c2, c4, c6, c7, c8])
i3 = Interest.create!(donor_name: 'Burger Queen', donor_email: 'community@burgerqueen.com',
                      campaign_name: 'Burger Queen Campaign', campaign_description: 'Burger Queen is raising funds!',
                      promised_amount: 2000, start: DateTime.now - 3.months, end: DateTime.now + 3.months,
                      status: 'pending', coupon_denomination: 100, charities: [c1, c2, c3, c4, c7])
i4 = Interest.create!(donor_name: 'Google', donor_email: 'contributing@google.com', campaign_name: 'Google Campaign',
                      campaign_description: 'Google is raising funds!', promised_amount: 3000,
                      start: DateTime.now - 1.month, end: DateTime.now + 3.months, status: 'pending',
                      coupon_denomination: 20, charities: [c1, c3, c4, c5, c8])
i5 = Interest.create!(donor_name: 'National University of Singapore', donor_email: 'coupons@nus.edu.sg',
                      campaign_name: 'NUS Campaign', campaign_description: 'NUS is raising funds!',
                      promised_amount: 800, start: DateTime.now - 3.months, end: DateTime.now + 3.months,
                      status: 'pending', coupon_denomination: 10, charities: [c6, c7, c8, c9, c10])
Interest.create!(donor_name: 'Cinnamon College', donor_email: 'cinnamon@nus.edu.sg',
                 campaign_name: 'Cinnamon Campaign', campaign_description: 'Cinnamon is raising funds!',
                 promised_amount: 800, start: DateTime.now + 1.month, end: DateTime.now + 3.months, status: 'pending',
                 coupon_denomination: 50, charities: [c1, c4, c5, c7, c10])
Interest.create!(donor_name: 'Derek Zoolander', donor_email: 'derek@gmail.com', campaign_name: 'Derek Campaign',
                 campaign_description: 'Derek is raising funds!', promised_amount: 300, start: DateTime.now + 1.month,
                 end: DateTime.now + 3.months, status: 'pending', coupon_denomination: 10,
                 charities: [c1, c2, c3, c4, c5])

def create_campaign_from_interest(interest)
  donor = PrimaryDonor.find_or_initialize_by(email: interest.donor_email) do |new_donor|
    new_donor.name = interest.donor_name
  end
  Campaign.create!(name: interest.campaign_name, description: interest.campaign_description,
                   promised_amount: interest.promised_amount, start: interest.start, end: interest.end,
                   primary_donor: donor, coupon_denomination: interest.coupon_denomination, interest: interest,
                   campaign_charities: interest.charities.map do |c|
                                         CampaignCharity.new(charity: c, giving_sg_url: 'https://www.giving.sg/campaigns/bigsishelps11')
                                       end)
end

create_campaign_from_interest(i1)
create_campaign_from_interest(i2)
create_campaign_from_interest(i3)
create_campaign_from_interest(i4)
create_campaign_from_interest(i5)

# Campaign without interest
Campaign.create!(name: "Siva's fundraiser", description: 'Siva is raising funds!', promised_amount: 800,
                 start: DateTime.now + 1.month, end: DateTime.now + 12.months,
                 primary_donor: PrimaryDonor.new(name: 'Siva', email: 'sivarn@gmail.com'), coupon_denomination: 10,
                 campaign_charities: [c1, c2, c4, c8, c9].map do |c|
                                       CampaignCharity.new(charity: c, giving_sg_url: 'https://www.giving.sg/campaigns/bigsishelps11')
                                     end)

active_campaigns = Campaign.where('start <= :now AND campaigns.end >= :now', { now: DateTime.now })

# Redeem 30% of coupons with additional contributions
coupons_to_redeem = active_campaigns.flat_map(&:coupons).sample(Coupon.count * 0.30)
coupons_to_redeem.each do |c|
  SecondaryDonation.create!(coupon: c, amount: Random.rand(10..30),
                            campaign_charity: c.campaign.campaign_charities.sample)
end

# Some donations without coupons
10.times do
  SecondaryDonation.create!(coupon: nil, amount: Random.rand(10..30),
                            campaign_charity: active_campaigns.sample.campaign_charities.sample)
end
