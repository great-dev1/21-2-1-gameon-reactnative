/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {LongHeader} from '../components/longHeader';
import AppStatusBar from '../components/AppStatusBar';
import {colors} from '../common/colors';

export default (props) => {
  const navigate = props.navigation.navigate;
  return (
    <>
      <AppStatusBar
        backgroundColor={colors.lightgreen}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView style={styles.container}>
        <LongHeader
          title={'Terms of use'}
          color={'white'}
          left={'green'}
          route={'Settings'}
          navigate={navigate}
          removeRightIcon
          dark
        />
        <ScrollView contentContainerStyle={{padding: 20}}>
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>TERMS OF USE</Text>
            <View style={{paddingVertical: 5}}>
              <Text>Last revised on 21st July 2020</Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Welcome to Armago. These Terms of Use are between you and:
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>Armago ("Armago LTD")</Text>
              <Text>International House</Text>
              <Text>12 Constance Street</Text>
              <Text>London E16 8DQ</Text>
              <Text>United Kingdom</Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                The terms (“us”, “we”, the “Company” or “Armago”) refer to
                Armago LTD
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                1. Acceptance of Terms of Use Agreement.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                By creating a Armago account, whether through a mobile device,
                mobile application or computer (collectively, the “Service”) you
                agree to be bound by (i) these Terms of Use, (ii) our Privacy
                Policy, Cookie Policy and Safety Tips, each of which is
                incorporated by reference into this Agreement, and (iii) any
                terms disclosed and agreed to by you if you purchase additional
                features, products or services we offer on the Service
                (collectively, this "Agreement"). If you do not accept and agree
                to be bound by all of the terms of this Agreement, please do not
                use the Service.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                We may make changes to this Agreement and to the Service from
                time to time. We may do this for a variety of reasons including
                to reflect changes in or requirements of the law, new features,
                or changes in business practices. The most recent version of
                this Agreement will be posted on the Service under Settings and
                also on armago.uk, and you should regularly check for the most
                recent version. The most recent version is the version that
                applies. If the changes include material changes that affect
                your rights or obligations, we will notify you in advance of the
                changes by reasonable means, which could include notification
                through the Service or via email. If you continue to use the
                Service after the changes become effective, then you agree to
                the revised Agreement.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                2. Eligibility.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You must be at least 13 years of age to create an account on
                Armago and use the Service. By creating an account and using the
                Service, you represent and warrant that:
              </Text>
            </View>
            <View style={{paddingVertical: 5, marginLeft: 15}}>
              <Text>• you can form a binding contract with Armago</Text>
              <Text>
                • you are not a person who is barred from using the Service
                under the laws of the United Kingdom, specifically in England
              </Text>
              <Text>
                • you are not a person who is barred from using the Service
                under the laws of the United States or any other applicable
                jurisdiction–meaning that you do not appear on the U.S. Treasury
                Department’s list of Specially Designated Nationals or face any
                other similar prohibition,
              </Text>
              <Text>
                • you will comply with this Agreement and all applicable local,
                state, national and international laws, rules and regulations,
                and
              </Text>
              <Text>
                • you have never been convicted of a felony or indictable
                offense (or crime of similar severity), a sex crime, or any
                crime involving violence, and that you are not required to
                register as a sex offender with any state, federal or local sex
                offender registry.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                3. Your Account.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                In order to use Armago, you may sign in using your Facebook,
                Google or Apple login. If you do so, you authorize us to access
                and use certain Facebook, Google and Apple account information,
                including but not limited to your public profiles. For more
                information regarding the information we collect from you and
                how we use it, please consult our Privacy Policy.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You are responsible for maintaining the confidentiality of your
                login credentials you use to sign up for Armago, and you are
                solely responsible for all activities that occur under those
                credentials. If you think someone has gained access to your
                account, please immediately contact us.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                4. Modifying the Service and Termination.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Armago is always striving to improve the Service and bring you
                additional functionality that you will find engaging and useful.
                This means we may add new product features or enhancements from
                time to time as well as remove some features, and if these
                actions do not materially affect your rights or obligations, we
                may not provide you with notice before taking them. We may even
                suspend the Service entirely, in which event we will notify you
                in advance unless extenuating circumstances, such as safety or
                security concerns, prevent us from doing so.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You may terminate your account at any time, for any reason, by
                following the instructions in "Settings" in the Service, however
                if you use a third party payment account, you will need to
                manage in app purchases through such account (e.g., iTunes,
                Google Play) to avoid additional billing. Armago may terminate
                your account at any time without notice if it believes that you
                have violated this Agreement. Upon such termination, you will
                not be entitled to any refund for purchases. After your account
                is terminated, this Agreement will terminate, except that the
                following provisions will still apply to you and Armago: Section
                4, Section 5, and Sections 12 through 19.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                5. Safety; Your Interactions with Other Members and Groups.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Though Armago strives to encourage a respectful member
                experience through features like the double opt-in that allows
                members to communicate only after they have both indicated
                interest in one another, it is not responsible for the conduct
                of any member on or off of the Service. You agree to use caution
                in all interactions with other members, particularly if you
                decide to communicate off the Service or meet in person. In
                addition, you agree to review and follow Armago’s Safety Tips
                prior to using the Service. You agree that you will not provide
                your financial information (for example, your credit card or
                bank account information), or wire or otherwise send money, to
                other members.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER
                MEMBERS. YOU UNDERSTAND THAT ARMAGO DOES NOT CONDUCT CRIMINAL
                BACKGROUND CHECKS ON ITS MEMBERS AND/OR GROUPS OR OTHERWISE
                INQUIRE INTO THE BACKGROUND OF ITS MEMBERS AND/OR GROUPS. ARMAGO
                MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF
                MEMBERS.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                6. Rights Armago Grants You.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Armago grants you a personal, worldwide, royalty-free,
                non-assignable, nonexclusive, revocable, and non-sublicensable
                license to access and use the Service. This license is for the
                sole purpose of letting you use and enjoy the Service’s benefits
                as intended by Armago and permitted by this Agreement.
                Therefore, you agree not to:
              </Text>
            </View>
            <View style={{paddingVertical: 5, marginLeft: 15}}>
              <Text>
                • use the Service or any content contained in the Service for
                any commercial purposes without our written consent.
              </Text>
              <Text>
                • copy, modify, transmit, create any derivative works from, make
                use of, or reproduce in any way any copyrighted material,
                images, trademarks, trade names, service marks, or other
                intellectual property, content or proprietary information
                accessible through the Service without Armago’s prior written
                consent.
              </Text>
              <Text>
                • use any robot, bot, spider, crawler, scraper, site
                search/retrieval application, proxy or other manual or automatic
                device, method or process to access, retrieve, index, "data
                mine", or in any way reproduce or circumvent the navigational
                structure or presentation of the Service or its contents.
              </Text>
              <Text>
                • use the Service in any way that could interfere with, disrupt
                or negatively affect the Service or the servers or networks
                connected to the Service.
              </Text>
              <Text>
                • upload viruses or other malicious code or otherwise compromise
                the security of the Service.
              </Text>
              <Text>
                • forge headers or otherwise manipulate identifiers in order to
                disguise the origin of any information transmitted to or through
                the Service.
              </Text>
              <Text>
                • "frame" or "mirror" any part of the Service without Armago’s
                prior written authorization.
              </Text>
              <Text>
                • use meta tags or code or other devices containing any
                reference to Armago or the Service (or any trademark, trade
                name, service mark, logo or slogan of Armago) to direct any
                person to any other website for any purpose.
              </Text>
              <Text>
                • modify, adapt, sublicense, translate, sell, reverse engineer,
                decipher, decompile or otherwise disassemble any portion of the
                Service, or cause others to do so.
              </Text>
              <Text>
                • use or develop any third-party applications that interact with
                the Service or other members' Content or information without our
                written consent.
              </Text>
              <Text>
                • use, access, or publish the Armago application programming
                interface without our written consent.
              </Text>
              <Text>
                • probe, scan or test the vulnerability of our Service or any
                system or network.
              </Text>
              <Text>
                • encourage or promote any activity that violates this
                Agreement.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                The Company may investigate and take any available legal action
                in response to illegal and/ or unauthorized uses of the Service,
                including termination of your account.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Any software that we provide you may automatically download and
                install upgrades, updates, or other new features. You may be
                able to adjust these automatic downloads through your device's
                settings.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                7. Rights you Grant Armago.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                By creating an account, you grant to Armago a worldwide,
                transferable, sub-licensable, royalty-free, right and license to
                host, store, use, copy, display, reproduce, adapt, edit,
                publish, modify and distribute information you authorize us to
                access from Facebook, Google & Apple, as well as any information
                you post, upload, display or otherwise make available
                (collectively, "post") on the Service or transmit to other
                members (collectively, "Content"). Armago's license to your
                Content shall be non-exclusive, except that Armago's license
                shall be exclusive with respect to derivative works created
                through use of the Service. For example, Armago would have an
                exclusive license to screenshots of the Service that include
                your Content. In addition, so that Armago can prevent the use of
                your Content outside of the Service, you authorize Armago to act
                on your behalf with respect to infringing uses of your Content
                taken from the Service by other members or third parties. This
                expressly includes the authority, but not the obligation, to
                send notices pursuant to 17 U.S.C. § 512(c)(3) (i.e., DMCA
                Takedown Notices) on your behalf if your Content is taken and
                used by third parties outside of the Service. Our license to
                your Content is subject to your rights under applicable law (for
                example laws regarding personal data protection to the extent
                any Content contains personal information as defined by those
                laws) and is for the limited purpose of operating, developing,
                providing, and improving the Service and researching and
                developing new ones. You agree that any Content you place or
                that you authorize us to place on the Service may be viewed by
                other members and may be viewed by any person visiting or
                participating in the Service (such as individuals who may
                receive shared Content from other Armago members).
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You agree that all information that you submit upon creation of
                your account, including information submitted from your
                Facebook, Google or Apple accounts, is accurate and truthful and
                you have the right to post the Content on the Service and grant
                the license to Armago above.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You understand and agree that we may monitor or review any
                Content you post as part of a Service. We may delete any
                Content, in whole or in part, that in our sole judgment violates
                this Agreement or may harm the reputation of the Service.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                When communicating with our customer care representatives, you
                agree to be respectful and kind. If we feel that your behaviour
                towards any of our customer care representatives or other
                employees is at any time threatening or offensive, we reserve
                the right to immediately terminate your account.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                In consideration for Armago allowing you to use the Service, you
                agree that we, our affiliates, and our third-party partners may
                place advertising on the Service. By submitting suggestions or
                feedback to Armago regarding our Service, you agree that Armago
                may use and share such feedback for any purpose without
                compensating you.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Please be informed that Armago may access, store and disclose
                your account information and Content if required to do so by
                law, by performing its agreement with you, or in a good faith
                belief that such access, storage or disclosure satisfies a
                legitimate interest, including to: (i) comply with legal
                process; (ii) enforce the Agreement; (iii) respond to claims
                that any Content violates the rights of third parties; (iv)
                respond to your requests for customer service; or (v) protect
                the rights, property or personal safety of the Company or any
                other person.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                8. Community Rules.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>By using the Service, you agree that you will not:</Text>
            </View>
            <View style={{paddingVertical: 5, marginLeft: 15}}>
              <Text>
                • use the Service for any purpose that is illegal or prohibited
                by this Agreement.
              </Text>
              <Text>
                • use the Service for any harmful or nefarious purpose
              </Text>
              <Text>• use the Service in order to damage Armago</Text>
              <Text>
                • violate our Community Guidelines, as updated from time to
                time.
              </Text>
              <Text>• spam, solicit money from or defraud any members.</Text>
              <Text>
                • impersonate any person or entity or post any images of another
                person without his or her permission.
              </Text>
              <Text>
                • bully, "stalk", intimidate, assault, harass, mistreat or
                defame any person.
              </Text>
              <Text>
                • post any Content that violates or infringes anyone's rights,
                including rights of publicity, privacy, copyright, trademark or
                other intellectual property or contract right.
              </Text>
              <Text>
                • post any Content that is hate speech, threatening, sexually
                explicit or pornographic; incites violence; or contains nudity
                or graphic or gratuitous violence.
              </Text>
              <Text>
                • post any Content that promotes racism, bigotry, hatred or
                physical harm of any kind against any group or individual.
              </Text>
              <Text>
                • solicit passwords for any purpose, or personal identifying
                information for commercial or unlawful purposes from other
                members or disseminate another person's personal information
                without his or her permission.
              </Text>
              <Text>
                • use another member's account, share an account with another
                member, or maintain more than one account.
              </Text>
              <Text>
                • create another account if we have already terminated your
                account, unless you have our permission.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Armago reserves the right to investigate and/ or terminate your
                account without a refund of any purchases if you have violated
                this Agreement, misused the Service or behaved in a way that
                Armago regards as inappropriate or unlawful, including actions
                or communications that occur on or off the Service.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                9. Other Members' Content.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Although Armago reserves the right to review and remove Content
                that violates this Agreement, such Content is the sole
                responsibility of the member who posts it, and Armago cannot
                guarantee that all Content will comply with this Agreement. If
                you see Content on the Service that violates this Agreement,
                please report it within the Service or via our contact form.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                10. Purchases.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Generally.</Text> From time
                to time, Armago may offer products and services for purchase
                ("in app purchases") through iTunes, Google Play, carrier
                billing, Armago direct billing or other payment platforms
                authorized by Armago. If you choose to make an in app purchase,
                you will be prompted to confirm your purchase with the
                applicable payment provider, and your method of payment (be it
                your card or a third party account such as Google Play or
                iTunes) (your "Payment Method") will be charged for the in app
                purchase at the prices displayed to you for the service(s)
                you've selected as well as any sales or similar taxes that may
                be imposed on your payments, and you authorize Armago or the
                third party account, as applicable, to charge you. If you
                purchase an auto-recurring periodic subscription through an in
                app purchase, your Payment Method will continue to be billed for
                the subscription until you cancel. After your initial
                subscription commitment period, and again after any subsequent
                subscription period, your subscription will automatically
                continue for an additional equivalent period, at the price you
                agreed to when subscribing.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontWeight: 'bold'}}>
                Auto-Renewal; Automatic Card Payment
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Subscriptions are automatically renewed until you terminate or
                cancel the subscription. When you purchase a subscription, your
                Payment Method will continue to be billed monthly in advance
                within 24 hours of the date of the initial purchase at the price
                you agreed to when initially subscribing. Your card payment
                information will be stored and subsequently used for the
                automatic card payments in accordance with the Agreement.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Objections to a payment already made should be directed to
                Customer support if you were billed directly by Armago or the
                relevant third party account such as iTunes. You are also be
                able to object by contacting your bank or payment provider, who
                can provide further information on your rights as well as
                applicable time limits.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You may unconditionally withdraw your consent to automatic card
                payments at any time by going to Settings on Armago or the
                relevant third party account, but be advised that you are still
                obligated to pay any outstanding amounts.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                If you want to change or terminate your subscription, you will
                need to log in to your third party account (or Settings on
                Armago) and follow instructions to terminate or cancel your
                subscription, even if you have otherwise deleted your account
                with us or if you have deleted the Armago application from your
                device. Deleting your account on Armago or deleting the Armago
                application from your device does not terminate or cancel your
                subscription; Armago will retain all funds charged to your
                Payment Method until you terminate or cancel your subscription
                on Armago or the third party account, as applicable. If you
                terminate or cancel your subscription, you may use your
                subscription until the end of your then-current subscription
                term, and your subscription will not be renewed after your
                then-current term expires.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>
                  Additional Terms that apply if you pay Armago directly with
                  your Payment Method.
                </Text>{' '}
                If you pay Armago directly, Armago may correct any billing
                errors or mistakes that it makes even if it has already
                requested or received payment. If you initiate a chargeback or
                otherwise reverse a payment made with your Payment Method,
                Armago may terminate your account immediately in its sole
                discretion.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You may edit your Payment Method information by visiting Armago
                and going to Settings. If a payment is not successfully settled,
                due to expiration, insufficient funds, or otherwise, and you do
                not edit your Payment Method information, terminate or cancel
                your subscription, you remain responsible for any uncollected
                amounts and authorize us to continue billing the Payment Method,
                as it may be updated. This may result in a change to your
                payment billing dates. In addition, you authorize us to obtain
                updated or replacement expiration dates and card numbers for
                your credit or debit card as provided by your credit or debit
                card issuer. The terms of your payment will be based on your
                Payment Method and may be determined by agreements between you
                and the financial institution, credit card issuer or other
                provider of your chosen Payment Method. If you reside outside of
                the Americas, you agree that your payment to Armago will be
                through Armago LTD.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Other Virtual Items.</Text>{' '}
                From time to time, you may be able to purchase a limited,
                personal, non-transferable, non-sublicensable, revocable license
                to use "virtual items", including but not limited to Super Likes
                (collectively, "Virtual Items"). Any Virtual Item balance shown
                in your account does not constitute a real-world balance or
                reflect any stored value, but instead constitutes a measurement
                of the extent of your license. Virtual Items do not incur fees
                for non-use, however, the license granted to you in Virtual
                Items will terminate in accordance with the terms of this
                Agreement, when Armago ceases providing the Service or your
                account is otherwise closed or terminated. Armago, in its sole
                discretion, reserves the right to charge fees for the right to
                access or use Virtual Items and/ or may distribute Virtual Items
                with or without charge. Armago may manage, regulate, control,
                modify or eliminate Virtual Items at any time. Armago shall have
                no liability to you or any third party in the event that Armago
                exercises any such rights. Virtual Items may only be redeemed
                through the Service. ALL PURCHASES AND REDEMPTIONS OF VIRTUAL
                ITEMS MADE THROUGH THE SERVICE ARE FINAL AND NON-REFUNDABLE. The
                provision of Virtual Items for use in the Service is a service
                that commences immediately upon the acceptance of your purchase
                of such Virtual Items. YOU ACKNOWLEDGE THAT ARMAGO IS NOT
                REQUIRED TO PROVIDE A REFUND IN RESPECT OF VIRTUAL ITEMS FOR ANY
                REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER
                COMPENSATION FOR UNUSED VIRTUAL ITEMS WHEN AN ACCOUNT IS CLOSED,
                WHETHER SUCH CLOSURE WAS VOLUNTARY OR INVOLUNTARY.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Refunds.</Text> Generally,
                all charges for purchases are nonrefundable, and there are no
                refunds or credits for partially used periods. We may make an
                exception if a refund for a subscription offering is requested
                within fourteen days of the transaction date, or if the laws
                applicable in your jurisdiction provide for refunds.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                For subscribers residing in the EU or European Economic Area, in
                accordance with local law, you are entitled to a full refund
                without stating the reason during the 14 days after the
                subscription begins. Please note that this 14-day period
                commences when the subscription starts.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Purchases of Virtual Items are FINAL AND NON-REFUNDABLE.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>To request a refund:</Text>
              <Text>
                If you subscribed using your Apple ID, refunds are handled by
                Apple, not Armago. To request a refund, go to iTunes, click on
                your Apple ID, select "Purchase history", find the transaction
                and hit "Report Problem". You can also submit a request at
                https://getsupport.apple.com.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                If you subscribed using your Google Play Store account or
                through Armago directly: please contact customer support with
                your order number for the Google Play Store (you can find the
                order number in the order confirmation email or by logging in to
                Google Wallet) or Armago (you can find this on your confirmation
                email).
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                If you use your right of cancellation (except for purchases made
                through your Apple ID, which Apple controls), we will refund (or
                ask Google to refund) all payments received from you, without
                undue delay and in any case within 14 days of the date when we
                received notice of your decision to cancel the Agreement. We
                shall make such refund using the same means of payment as used
                by you in the initial transaction. In any case, no fees will be
                charged to you as a result of the refund.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You cannot cancel an order for delivery of digital content that
                is not delivered on a physical medium if order processing has
                begun with your explicit prior consent and acknowledgement that
                you will thereby lose your right of cancellation. This applies,
                e.g., to purchases of Virtual Items. That means that such
                purchases are FINAL AND NON-REFUNDABLE.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                <Text styles={{fontWeight: 'bold'}}>Pricing.</Text> Armago
                operates a global business and provides services to a diverse
                community of members. Our pricing structure may vary by region,
                length of subscription, bundle size, recent in-app promotions
                and other factors. We frequently test new features and price
                points to provide members with increased functionality and
                payment options should they choose to use them.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                11. Notice and Procedure for Making Claims of Copyright
                Infringement.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                If you believe that your work has been copied and posted on the
                Service in a way that constitutes copyright infringement, please
                provide our Copyright Agent with the following information:
              </Text>
            </View>
            <View style={{paddingVertical: 5, marginLeft: 15}}>
              <Text>
                • an electronic or physical signature of the person authorized
                to act on behalf of the owner of the copyright interest;
              </Text>
              <Text>
                • a description of the copyrighted work that you claim has been
                infringed;
              </Text>
              <Text>
                • a description of where the material that you claim is
                infringing is located on the Service (and such description must
                be reasonably sufficient to enable us to find the alleged
                infringing material);
              </Text>
              <Text>
                • your contact information, including address, telephone number
                and email address;
              </Text>
              <Text>
                • a written statement by you that you have a good faith belief
                that the disputed use is not authorized by the copyright owner,
                its agent, or the law; and
              </Text>
              <Text>
                • a statement by you, made under penalty of perjury, that the
                above information in your notice is accurate and that you are
                the copyright owner or authorized to act on the copyright
                owner's behalf.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Notice of claims of copyright infringement should be provided to
                the Company's Copyright Agent via email to admin@armago.uk or
                via mail to the following address:
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                International House, 12 Constance Street, London, E16 8DQ,
                United Kingdom
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Armago will terminate the accounts of repeat infringers.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                12. Disclaimers.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                ARMAGO PROVIDES THE SERVICE ON AN “AS IS” AND “AS AVAILABLE”
                BASIS AND TO THE EXTENT PERMITTED BY APPLICABLE LAW, GRANTS NO
                WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR
                OTHERWISE WITH RESPECT TO THE SERVICE (INCLUDING ALL CONTENT
                CONTAINED THEREIN), INCLUDING, WITHOUT LIMITATION, ANY IMPLIED
                WARRANTIES OF SATISFACTORY QUALITY, MERCHANTABILITY, FITNESS FOR
                A PARTICULAR PURPOSE OR NON-INFRINGEMENT. ARMAGO DOES NOT
                REPRESENT OR WARRANT THAT (A) THE SERVICE WILL BE UNINTERRUPTED,
                SECURE OR ERROR FREE, (B) ANY DEFECTS OR ERRORS IN THE SERVICE
                WILL BE CORRECTED, OR (C) THAT ANY CONTENT OR INFORMATION YOU
                OBTAIN ON OR THROUGH THE SERVICE WILL BE ACCURATE.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                ARMAGO TAKES NO RESPONSIBILITY FOR ANY CONTENT THAT YOU OR
                ANOTHER MEMBER OR THIRD PARTY POSTS, SENDS OR RECEIVES THROUGH
                THE SERVICE. ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED
                THROUGH THE USE OF THE SERVICE IS ACCESSED AT YOUR OWN
                DISCRETION AND RISK.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                13. Third Party Services.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                The Service may contain advertisements and promotions offered by
                third parties and links to other web sites or resources. Armago
                is not responsible for the availability (or lack of
                availability) of such external websites or resources. If you
                choose to interact with the third parties made available through
                our Service, such party's terms will govern their relationship
                with you. Armago is not responsible or liable for such third
                parties' terms or actions.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                14. Limitation of Liability.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                WILL ARMAGO, ITS AFFILIATES, EMPLOYEES, LICENSORS OR SERVICE
                PROVIDERS BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY,
                INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING, WITHOUT
                LIMITATION, LOSS OF PROFITS, WHETHER INCURRED DIRECTLY OR
                INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
                INTANGIBLE LOSSES, RESULTING FROM: (I) YOUR ACCESS TO OR USE OF
                OR INABILITY TO ACCESS OR USE THE SERVICE, (II) THE CONDUCT OR
                CONTENT OF OTHER MEMBERS OR THIRD PARTIES ON, THROUGH, OR
                FOLLOWING USE OF THE SERVICE; OR (III) UNAUTHORIZED ACCESS, USE
                OR ALTERATION OF YOUR CONTENT, EVEN IF ARMAGO HAS BEEN ADVISED
                OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT WILL ARMAGO’S
                AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS RELATING TO THE
                SERVICE EXCEED THE GREATER OF THE AMOUNT PAID, IF ANY, BY YOU TO
                ARMAGO FOR THE SERVICE AND USD100 WHILE YOU HAVE AN ACCOUNT.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
                CERTAIN DAMAGES, SO SOME OR ALL OF THE EXCLUSIONS AND
                LIMITATIONS IN THIS SECTION MAY NOT APPLY TO YOU.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                15. Governing Law.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                For members residing in the EU or European Economic Area or
                elsewhere where our arbitration agreement is prohibited by law,
                the laws of England, United Kingdom, will apply to any disputes
                arising out of or relating to this Agreement or the Service.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>16. Venue.</Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Except for members residing in the EU or European Economic Area
                who may bring claims in their country of residence in accordance
                with applicable law and except for claims that may be properly
                brought in a small claims court of competent jurisdiction, all
                claims arising out of or relating to this Agreement, to the
                Service, or to your relationship with Armago that for whatever
                reason are not submitted to arbitration will be litigated
                exclusively in the courts of Dallas England, United Kingdom. You
                and Armago consent to the exercise of personal jurisdiction of
                courts in England and waive any claim that such courts
                constitute an inconvenient forum.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                17. Indemnity by You.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You agree, to the extent permitted under applicable law, to
                indemnify, defend and hold harmless Armago, our affiliates, and
                their and our respective officers, directors, agents, and
                employees from and against any and all complaints, demands,
                claims, damages, losses, costs, liabilities and expenses,
                including attorney’s fees due to, arising out of, or relating in
                any way to your access to or use of the Service, your Content,
                or your breach of this Agreement.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                18. Entire Agreement; Other.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                This Agreement, along with the Privacy Policy, Cookie Policy,
                the Safety Tips, the Arbitration Procedures (if applicable to
                you), and any terms disclosed and agreed to by you if you
                purchase additional features, products or services we offer on
                the Service, contains the entire agreement between you and
                Armago regarding the use of the Service. If any provision of
                this Agreement is held invalid, the remainder of this Agreement
                shall continue in full force and effect. The failure of the
                Company to exercise or enforce any right or provision of this
                Agreement shall not constitute a waiver of such right or
                provision. You agree that your Armago account is
                non-transferable and all of your rights to your account and its
                Content terminate upon your death. No agency, partnership, joint
                venture, fiduciary or other special relationship or employment
                is created as a result of this Agreement and you may not make
                any representations on behalf of or bind Armago in any manner.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
