# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

image_urls = [
  "https://firebasestorage.googleapis.com/v0/b/giving-coupons-sg-development.appspot.com/
o/images%2F02d446ef-99ce-4c9a-acfe-9ffb5eabec52?alt=media&token=a155fc5f-fa23-43d3-a166-5246a16c7bcc",
  "https://firebasestorage.googleapis.com/v0/b/giving-coupons-sg-development.appspot.com/
o/images%2F03d5eca5-8a94-4770-9528-91516c751180?alt=media&token=bbb28312-6347-41c0-ba1c-ae6e35431f07"
]

logo_urls = [
  "https://firebasestorage.googleapis.com/v0/b/giving-coupons-sg-development.appspot.com/
o/images%2Fd137fe47-81e7-4169-968d-8804f2b7e758?alt=media&token=d9605a54-89db-4dc9-a78a-7dbfb9e1ef93",
  "https://firebasestorage.googleapis.com/v0/b/giving-coupons-sg-development.appspot.com/
o/images%2Ff2de1b63-8ab5-466a-a382-4bb704de117e?alt=media&token=3bc5b27c-363d-4f6b-a4c1-3aede4504d7b",
  "https://firebasestorage.googleapis.com/v0/b/giving-coupons-sg-development.appspot.com/
o/images%2F5f4a4615-e347-490b-9cd2-6d5e6888df85?alt=media&token=c4817294-6552-41ea-a090-6d9ccfd4da17"
]

donor_image_urls = [
  "https://firebasestorage.googleapis.com/v0/b/giving-coupons-sg-development.appspot.com/
o/images%2F5bdee418-c596-41c2-b010-db71e243a80e?alt=media&token=968b974b-16cd-40f0-9312-b4bb15e230b8",
  "https://firebasestorage.googleapis.com/v0/b/giving-coupons-sg-development.appspot.com/
o/images%2F32a0e741-fd50-48d7-bb39-748fbac1fb13?alt=media&token=fea900af-d437-4430-8b93-cefa93c11a9b"
]

c1 = Charity.new(name: 'Ark', website_url: 'https://www.ark.org', description: 'Placeholder Ark')
c2 = Charity.new(name: 'Bork', website_url: 'https://www.bork.org', description: 'Placeholder Bork')
c3 = Charity.new(name: 'Creek', website_url: 'https://www.creek.org', description: 'Placeholder Creek')
c4 = Charity.new(name: 'Dirk', website_url: 'https://www.dirk.org', description: 'Placeholder Dirk')
c5 = Charity.new(name: 'Erk', website_url: 'https://www.erk.org', description: 'Placeholder Erk')
c6 = Charity.new(name: 'Fork', website_url: 'https://www.fork.org', description: 'Placeholder Fork')
c7 = Charity.new(name: 'Gork', website_url: 'https://www.gork.org', description: 'Placeholder Gork')
c8 = Charity.new(name: 'Hork', website_url: 'https://www.hork.org', description: 'Placeholder Hork')
c9 = Charity.new(name: 'Irk', website_url: 'https://www.irk.org', description: 'Placeholder Irk')
c10 = Charity.new(name: 'Jerk', website_url: 'https://www.jerk.org', description: 'Placeholder Jerk')

[c1, c2, c3, c4, c5, c6, c7, c8, c9, c10].each do |c|
  c.logo_url = logo_urls.sample
  c.image_url = image_urls.sample
end

d1 = PrimaryDonor.new(name: 'Alice Tan', email: 'alicetan@gmail.com')
d2 = PrimaryDonor.new(name: 'Burger Queen', email: 'community@burgerqueen.com')
d3 = PrimaryDonor.new(name: 'Cinnamon', email: 'cinna@mon.com')
d4 = PrimaryDonor.new(name: 'Derek Zoolander', email: 'derek@gmail.com')
d5 = PrimaryDonor.new(name: 'Eddie and Mary Foundation', email: 'contact@jamf.com')

[d1, d2, d3, d4, d5].each do |d|
  d.image_url = donor_image_urls.sample
end

start_of_today = DateTime.now.beginning_of_day
end_of_today = DateTime.now.end_of_day

i1 = Interest.new(donor_name: 'Alice Tan', donor_email: 'alicetan@gmail.com', campaign_name: 'Alice Tan Campaign',
                  campaign_description: 'Alice Tan is raising funds!', promised_amount: 500,
                  start: start_of_today - 1.month, end: end_of_today + 1.month, status: 'pending',
                  initial_coupon_validity: 60,
                  coupon_denomination: 10, charities: [c1, c2, c3, c4, c5])
i2 = Interest.new(donor_name: 'Johnny Deep', donor_email: 'johnnydeep@hotmail.com',
                  campaign_name: 'Johnny Deep Campaign', campaign_description: 'Johnny Deep is raising funds!',
                  promised_amount: 1000, start: start_of_today - 2.months, end: end_of_today + 3.months,
                  initial_coupon_validity: 90,
                  status: 'pending', coupon_denomination: 10, charities: [c2, c4, c6, c7, c8])
i3 = Interest.new(donor_name: 'Burger Queen', donor_email: 'community@burgerqueen.com',
                  campaign_name: 'Burger Queen Campaign', campaign_description: 'Burger Queen is raising funds!',
                  promised_amount: 2000, start: start_of_today - 3.months, end: end_of_today + 3.months,
                  initial_coupon_validity: 120,
                  status: 'pending', coupon_denomination: 100, charities: [c1, c2, c3, c4, c7])
i4 = Interest.new(donor_name: 'Google', donor_email: 'contributing@google.com', campaign_name: 'Google Campaign',
                  campaign_description: 'Google is raising funds!', promised_amount: 3000,
                  start: start_of_today - 1.month, end: end_of_today + 3.months, status: 'pending',
                  initial_coupon_validity: 60,
                  coupon_denomination: 20, charities: [c1, c3, c4, c5, c8])
i5 = Interest.new(donor_name: 'National University of Singapore', donor_email: 'coupons@nus.edu.sg',
                  campaign_name: 'NUS Campaign', campaign_description: 'NUS is raising funds!',
                  promised_amount: 800, start: start_of_today - 3.months, end: end_of_today + 3.months,
                  initial_coupon_validity: 180,
                  status: 'pending', coupon_denomination: 10, charities: [c6, c7, c8, c9, c10])
i6 = Interest.new(donor_name: 'Cinnamon College', donor_email: 'cinnamon@nus.edu.sg',
                  campaign_name: 'Cinnamon Campaign', campaign_description: 'Cinnamon is raising funds!',
                  promised_amount: 800, start: start_of_today + 1.month, end: end_of_today + 3.months,
                  status: 'pending',
                  initial_coupon_validity: 30, coupon_denomination: 50, charities: [c1, c4, c5, c7, c10])
i7 = Interest.new(donor_name: 'Derek Zoolander', donor_email: 'derek@gmail.com', campaign_name: 'Derek Campaign',
                  campaign_description: 'Derek is raising funds!', promised_amount: 300,
                  start: start_of_today + 1.month, end: end_of_today + 3.months, status: 'pending',
                  initial_coupon_validity: 7, coupon_denomination: 10, charities: [c1, c2, c3, c4, c5])

[i1, i2, i3, i4, i5, i6, i7].each do |i|
  i.campaign_image_url = image_urls.sample
  i.donor_image_url = donor_image_urls.sample
end

def create_campaign_from_interest(interest)
  donor = PrimaryDonor.find_or_initialize_by(email: interest.donor_email) do |new_donor|
    new_donor.name = interest.donor_name
    new_donor.image_url = interest.donor_image_url
  end
  Campaign.new(name: interest.campaign_name, description: interest.campaign_description,
               promised_amount: interest.promised_amount, start: interest.start, end: interest.end,
               primary_donor: donor, coupon_denomination: interest.coupon_denomination, interest: interest,
               campaign_charities: interest.charities.map do |c|
                                     CampaignCharity.new(charity: c, giving_sg_url: 'https://www.giving.sg/campaigns/bigsishelps11')
                                   end)
end

campaign1 = create_campaign_from_interest(i1)
campaign2 = create_campaign_from_interest(i2)
campaign3 = create_campaign_from_interest(i3)
campaign4 = create_campaign_from_interest(i4)
campaign5 = create_campaign_from_interest(i5)

# Campaign without interest
campaign6 = Campaign.new(name: "Siva's fundraiser", description: 'Siva is raising funds!', promised_amount: 800,
                         start: start_of_today + 1.month, end: end_of_today + 12.months,
                         primary_donor: PrimaryDonor.new(name: 'Siva', email: 'sivarn@gmail.com'),
                         coupon_denomination: 10,
                         campaign_charities: [c1, c2, c4, c8, c9].map do |c|
                                               CampaignCharity.new(charity: c, giving_sg_url: 'https://www.giving.sg/campaigns/bigsishelps11')
                                             end)

campaigns = [campaign1, campaign2, campaign3, campaign4, campaign5, campaign6]

campaigns.each do |c|
  c.image_url = c.interest&.campaign_image_url || image_urls.sample

  c.save!

  c.queue_generate_coupons_job(c.end)
end

num_coupons_expected = campaigns.map(&:num_coupons_allowed).sum

# Wait for background coupon creation ActiveJobs to complete before redeeming coupons.
Coupon.uncached do
  sleep 1 while Coupon.count < num_coupons_expected
end

active_campaigns = Campaign.where('start <= :now AND campaigns.end >= :now', { now: DateTime.now })

# Redeem 30% of coupons with additional contributions
coupons_to_redeem = active_campaigns.flat_map(&:coupons).sample(Coupon.count * 0.30)
coupons_to_redeem.each do |c|
  campaign_charity = c.campaign.campaign_charities.sample
  secondary_donation = SecondaryDonation.new(amount: Random.rand(10..30), campaign_charity: campaign_charity,
                                             donated_at: DateTime.now)
  redemption = Redemption.new(campaign_charity: campaign_charity,
                              secondary_donation: secondary_donation,
                              redeemed_at: secondary_donation.donated_at,
                              coupon: c)
  redemption.save!
end

# Some donations without coupons
10.times do
  SecondaryDonation.create!(amount: Random.rand(10..30),
                            campaign_charity: active_campaigns.sample.campaign_charities.sample,
                            donated_at: DateTime.now)
end
