import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

function Privacy() {
  const matches = useMediaQuery("(max-width:970px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        style={{
          height: matches ? "100%" : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} sm={8}>
        <br/>
              <br/>
          <Typography variant="h3" component="div" gutterBottom>
            General Terms and Conditions
          </Typography>
          <div style={{ textAlign: "left" }}>
            <Typography variant="h6" gutterBottom component="div">
              Last updated: (17/11/2021)
            </Typography>
            <br/>
            <Typography>
              <Typography variant="p" component="div">
                Please read these Terms of Use carefully before using the
                https://www.askmaya.io website operated by Askmaya.
              </Typography>
              <Typography variant="p" component="div">
                Your access to and use of the Service is conditioned on your
                acceptance of and compliance with these Terms. These Terms apply
                to all visitors, users and others who access or use the Service.
              </Typography>
              <Typography variant="p" component="div">
                By accessing or using the Service you agree to be bound by these
                Terms. If you disagree with any part of the terms then you may
                not access the Service.
              </Typography>
              <br/>
              <br/>
              <Typography variant="h5" component="div">
                1. LICENSE AND ACCESS
              </Typography>
              <Typography variant="p" component="div">
                Subject to your compliance with these Conditions of Use and any
                Service Terms, and your payment of any applicable fees, Askmaya
                or its content providers grant you a limited, non-exclusive,
                non-transferable, non-sublicensable license to access and make
                personal and non-commercial use of the Askmaya Services. This
                license does not include any resale or commercial use of any
                Askmaya Service, or its contents; any collection and use of any
                product listings, descriptions, or prices; any derivative use of
                any Askmaya Service or its contents; any downloading, copying,
                or other use of account information for the benefit of any third
                party; or any use of data mining, robots, or similar data
                gathering and extraction tools. All rights not expressly granted
                to you in these Conditions of Use or any Service Terms are
                reserved and retained by Askmaya or its licensors, suppliers,
                publishers, rightsholders, or other content providers. No
                Askmaya Service, nor any part of any Askmaya Service, may be
                reproduced, duplicated, copied, sold, resold, visited, or
                otherwise exploited for any commercial purpose without express
                written consent of Askmaya . You may not frame or utilize
                framing techniques to enclose any trademark, logo, or other
                proprietary information (including images, text, page layout, or
                form) of Askmaya without express written consent. You may not
                use any meta tags or any other "hidden text" utilizing Askmaya
                name or trademarks without the express written consent of
                Askmaya . You may not misuse the Askmaya Services. You may use
                the Askmaya Services only as permitted by law. The licenses
                granted by Askmaya terminate if you do not comply with these
                Conditions of Use or any Service Terms.
              </Typography>
              <br/>
              <br/>
              <Typography variant="h5" component="div">
                2. YOUR ACCOUNT
              </Typography>
              <Typography variant="p" component="div">
                You may need your own Askmaya account to use certain Askmaya
                Services, and you may be required to be logged in to the account
                and have a valid payment method associated with it. If there is
                a problem charging your selected payment method, we may charge
                any other valid payment method associated with your account.
                Visit Your Payments to manage your payment options. You are
                responsible for maintaining the confidentiality of your account
                and password and for restricting access to your account, and you
                agree to accept responsibility for all activities that occur
                under your account or password. Askmaya does sell products for
                children, but it sells them to adults, who can purchase with a
                credit card or other permitted payment method. If you are under
                18, you may use the Askmaya Services only with involvement of a
                parent or guardian. Parents and guardians may create profiles
                for teenagers in their Askmaya Household. Alcohol listings on
                Askmaya are intended for adults. You must be at least 21 years
                of age to purchase alcohol, or use any site functionality
                related to alcohol. Askmaya reserves the right to refuse
                service, terminate accounts, terminate your rights to use
                Askmaya Services, remove or edit content, or cancel orders in
                its sole discretion.
              </Typography>
              <br/>
              <br/>
              <Typography variant="p" component="div">
                REVIEWS, COMMENTS, COMMUNICATIONS, AND OTHER CONTENT You may
                post reviews, comments, photos, videos, and other content; send
                e-cards and other communications; and submit suggestions, ideas,
                comments, questions, or other information, so long as the
                content is not illegal, obscene, threatening, defamatory,
                invasive of privacy, infringing of intellectual property rights
                (including publicity rights), or otherwise injurious to third
                parties or objectionable, and does not consist of or contain
                software viruses, political campaigning, commercial
                solicitation, chain letters, mass mailings, or any form of
                "spam" or unsolicited commercial electronic messages. You may
                not use a false e-mail address, impersonate any person or
                entity, or otherwise mislead as to the origin of a card or other
                content. Askmaya reserves the right (but not the obligation) to
                remove or edit such content, but does not regularly review
                posted content.
                <br />
                <br />
                If you do post content or submit material, and unless we
                indicate otherwise, you grant Askmaya a nonexclusive,
                royalty-free, perpetual, irrevocable, and fully sublicensable
                right to use, reproduce, modify, adapt, publish, perform,
                translate, create derivative works from, distribute, and display
                such content throughout the world in any media. You grant
                Askmaya and sublicensees the right to use the name that you
                submit in connection with such content, if they choose. You
                represent and warrant that you own or otherwise control all of
                the rights to the content that you post; that the content is
                accurate; that use of the content you supply does not violate
                this policy and will not cause injury to any person or entity;
                and that you will indemnify Askmaya for all claims resulting
                from content you supply. Askmaya has the right but not the
                obligation to monitor and edit or remove any activity or
                content. Askmaya takes no responsibility and assumes no
                liability for any content posted by you or any third party.
              </Typography>
              <br/>
              <br/>
              <Typography variant="h5" component="div">
                3. INTELLECTUAL PROPERTY COMPLAINTS
              </Typography>

              <Typography variant="p" component="div">
                Askmaya respects the intellectual property of others. If you
                believe that your intellectual property rights are being
                infringed, please follow our Notice and Procedure for Making
                Claims of Copyright Infringement
              </Typography>
              <br/>
              <br/>
              <Typography variant="h5" component="div">
                4. RISK OF LOSS{" "}
              </Typography>

              <Typography variant="p" component="div">
                All purchases of physical items from Askmaya are made pursuant
                to a shipment contract. This means that the risk of loss and
                title for such items pass to you upon our delivery to the
                carrier.
              </Typography>
              <br/>
              <br/>

              <Typography variant="h5" component="div">
                5. RETURNS, REFUNDS AND TITLE{" "}
              </Typography>

              <Typography variant="p" component="div">
                Askmaya does not take title to returned items until the item
                arrives at our fulfillment center. At our discretion, a refund
                may be issued without requiring a return. In this situation,
                Askmaya does not take title to the refunded item. For more
                information about our returns and refunds, please see our
                Returns Center.
              </Typography>
              <br/>
              <br/>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Privacy;
