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
          title={'Privacy Policy'}
          color={'white'}
          left={'green'}
          route={'Settings'}
          navigate={navigate}
          removeRightIcon
          dark
        />
        <ScrollView contentContainerStyle={{padding: 20}}>
          <Text style={{paddingVertical: 5, fontSize: 24, fontWeight: '700'}}>
            Our Commitment To You
          </Text>

          <View>
            <Text>
              For us at Armago, we value the importance of privacy. Your privacy
              central to the way we create products and services that help
              connect people in unique ways.
            </Text>
          </View>

          <View>
            <Text>
              We appreciate that your trust should not be taken for granted and
              aim to be clear about how we use your data.
            </Text>
          </View>
          <View>
            <Text>
              <Text styls={{fontWeight: '700', fontSize: 13}}>
                We are thorough with privacy.
              </Text>{' '}
              We look at privacy in all aspects of our company, whether that be
              in database management or our customer support.
            </Text>
          </View>

          <View>
            <Text>
              <Text styls={{fontWeight: '700', fontSize: 13}}>
                We aim to be as transparent as possible.
              </Text>{' '}
              A lot of policies are complex and we know that a lot might not be
              easy to read so we aim to be crystal clear.
            </Text>
          </View>
          <View>
            <Text>
              <Text styls={{fontWeight: '700', fontSize: 13}}>
                We work hard to secure your information.
              </Text>{' '}
              We regularly review our practices and processes to ensure that
              your privacy is a central priority for us in all areas of our
              operation.
            </Text>
          </View>
          {/* <hr> */}
          <Text style={{paddingVertical: 5, fontSize: 28, fontWeight: '700'}}>
            Privacy Policy
          </Text>
          <View>
            <Text>
              Welcome to the privacy policy for Armago LTD. Thank you for taking
              the time to read it.
            </Text>
          </View>
          <View>
            <Text>
              We appreciate that you trust us with your information and we
              intend to always keep that trust. This starts with making sure you
              understand the information we collect, why we collect it, how it
              is used and your choices regarding your information. This Policy
              describes our privacy practices in plain language, keeping legal
              and technical jargon to a minimum.
            </Text>
          </View>
          <View>
            <Text>This Privacy Policy applies beginning July 21, 2020.</Text>
          </View>
          <View>
            <Text>EFFECTIVE DATE: July 21, 2020.</Text>
          </View>
          <View style={{marginLeft: 13, padding: 7}}>
            <Text style={{textDecorationLine: 'underline'}}>1. Who We Are</Text>
            <Text style={{textDecorationLine: 'underline'}}>
              2. Where This Privacy Policy Applies
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              3. Information We Collect
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              4. Cookies And Other Similar Data Collection Technologies
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              5. How We Use Information
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              6. How We Share Information
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              7. Cross Border Data Transfers
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              8. Your Rights
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              9. Residents of California
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              10. How We Protect Your Information
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              11. How Long We Retain Your Information
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              12. Children's Privacy
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              13. Privacy Policy Changes
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              14. How To Contact Us
            </Text>
          </View>

          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            1. Who We Are
          </Text>
          <View>
            <Text>
              Regardless of territory, the company that is responsible for your
              information under this Privacy Policy (the “data controller”) is:
            </Text>
          </View>
          <View style={{marginLeft: 10}}>
            <View style={{padding: 10}}>
              <Text>Armago LTD</Text>
            </View>
            <View style={{padding: 10}}>
              <Text>International House</Text>
            </View>
            <View style={{padding: 10}}>
              <Text>Constance Street</Text>
            </View>
            <View style={{padding: 10}}>
              <Text>London</Text>
            </View>
            <View style={{padding: 10}}>
              <Text>E16 8DQ</Text>
            </View>
            <View style={{padding: 10}}>
              <Text>UNITED KINGDOM</Text>
            </View>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            2. Where This Privacy Policy Applies
          </Text>
          <View>
            <Text>
              This Privacy Policy applies to websites, apps, events and other
              services operated by Armago. For simplicity, we refer to all of
              these as our “services” in this Privacy Policy. To make it extra
              clear, we’ve added links to this Privacy Policy on all applicable
              services.
            </Text>
          </View>
          <View>
            <Text>
              Some services may require their own unique privacy policy. If a
              particular service has its own privacy policy, then that policy --
              not this Privacy Policy -- applies.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            3. Information We Collect
          </Text>
          <View>
            <Text>
              It goes without saying, we can’t help you develop meaningful
              connections without some information from you, such as basic
              profile details and what sort of activities you are doing. We also
              collect information generated as you use our services, for example
              access logs, as well as information from third parties, like when
              you access our services through a social media account. If you
              want additional info, we go into more detail below.
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            Information you give us
          </Text>
          <View>
            <Text>
              You choose to give us certain information when using our services.
              This includes:
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text>
              • When you create an account, you provide us with at least your
              login credentials, as well as some basic details necessary for the
              service to work, such as your gender and date of birth.
            </Text>
            <Text>
              • When you complete your profile, you can share with us additional
              information, such as details on the sports you do, your ability
              and your university and other details about you, as well as
              content such as photos and videos. To add certain content, like
              pictures or videos, you may allow us to access your camera or
              photo album. Some of the information you choose to provide us may
              be considered “special” or “sensitive” in certain jurisdictions,
              for example your racial or ethnic origins, sexual orientation and
              religious beliefs. By choosing to provide this information, you
              consent to our processing of that information.
            </Text>
            <Text>
              • When you subscribe to a paid service or make a purchase directly
              from us (rather than through a platform such as iOS or Android),
              you provide us or our payment service provider with information,
              such as your debit or credit card number or other financial
              information.
            </Text>
            <Text>
              • When you participate in surveys or focus groups, you give us
              your insights into our products and services, responses to our
              questions and testimonials.
            </Text>
            <Text>
              • When you participate in product testing you might give us more
              in depth information about your device such as your operating
              system and phone model .
            </Text>
            <Text>
              • When you choose to participate in our promotions, events or
              contests, we collect the information that you use to register or
              enter.
            </Text>
            <Text>
              • If you contact our customer care team, we collect the
              information you give us during the interaction. Sometimes, we
              monitor or record these interactions for training purposes, legal
              purposes and to ensure a high quality of service.
            </Text>
            <Text>
              • If you ask us to communicate with or otherwise process
              information of other people (for example, if you ask us to send an
              email on your behalf to one of your friends), we collect the
              information about others that you give us in order to complete
              your request.
            </Text>
            <Text>
              • Of course, we also process your chats with other users as well
              as the content you publish, as part of the operation of the
              services.
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            Information we receive from others
          </Text>
          <View>
            <Text>
              In addition to the information you provide us directly, we receive
              information about you from others, including:
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text styls={{fontWeight: '700', fontSize: 13}}>• Other Users</Text>
            <Text>
              Other users may provide information about you as they use our
              services. For instance, we may collect information about you from
              other users if they contact us about you.
            </Text>
            <Text styls={{fontWeight: '700', fontSize: 13}}>
              • Clubs and Organisations
            </Text>
            <Text>
              Clubs and organisations can use our service to bring together
              users in other contexts and they may give us information such as
              their activities, users, demographics and league information.
            </Text>
            <Text styls={{fontWeight: '700', fontSize: 13}}>
              • Social Media
            </Text>
            <Text>
              You may be able to use your social media login (such as Facebook
              Login) to create and log into your Armago account. This saves you
              from having to remember yet another user name and password and
              allows you to share some information from your social media
              account with us.
            </Text>
            <Text styls={{fontWeight: '700', fontSize: 13}}>
              • Other Partners
            </Text>
            <Text>
              We may receive info about you from our partners, for instance
              where Armago ads are published on a partner’s websites and
              platforms (in which case they may pass along details on a
              campaign’s success).
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            Information collected when you use our services
          </Text>
          <View>
            <Text>
              When you use our services, we collect information about which
              features you’ve used, how you’ve used them and the devices you use
              to access our services. See below for more details:
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text styls={{fontWeight: '700', fontSize: 13}}>
              • Usage Information
            </Text>
            <Text>
              We collect information about your activity on our services, for
              instance how you use them (e.g., date and time you logged in,
              features you’ve been using, searches, clicks and pages which have
              been shown to you, referring webpage address, advertising that you
              click on) and how you interact with other users (e.g., users you
              connect and interact with, time and date of your exchanges, number
              of messages you send and receive).
            </Text>
            <View>
              <Text styls={{fontWeight: '700', fontSize: 13}}>
                • Device information
              </Text>
              <Text>
                We collect information from and about the device(s) you use to
                access our services, including:
              </Text>
              <View style={{paddingLeft: 10}}>
                <Text>
                  o hardware and software information such as IP address, device
                  ID and type, device-specific and apps settings and
                  characteristics, app crashes, advertising IDs (such as
                  Google’s AAID and Apple's IDFA, both of which are randomly
                  generated numbers that you can reset by going into your
                  device’ settings), browser type, version and language,
                  operating system, time zones, identifiers associated with
                  cookies or other technologies that may uniquely identify your
                  device or browser (e.g., IMEI/UDID and MAC address);
                </Text>
                <Text>
                  o information on your wireless and mobile network connection,
                  like your service provider and signal strength;
                </Text>
                <Text>
                  o information on device sensors such as accelerometers,
                  gyroscopes and compasses.
                </Text>
              </View>
            </View>
            <Text styls={{fontWeight: '700', fontSize: 13}}>
              • Other information with your consent
            </Text>
            <Text>
              If you give us permission, we can collect your precise geolocation
              (latitude and longitude) through various means, depending on the
              service and device you’re using, including GPS, Bluetooth or Wi-Fi
              connections. The collection of your geolocation may occur in the
              background even when you aren’t using the services if the
              permission you gave us expressly permits such collection. If you
              decline permission for us to collect your geolocation, we will not
              collect it. Similarly, if you consent, we may collect your photos
              and videos (for instance, if you want to publish a photo, video or
              streaming on the services).
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            4. Cookies and Other Similar Data Collection Technologies
          </Text>
          <View>
            <Text>
              We use and may allow others to use cookies and similar
              technologies (e.g., web beacons, pixels) to recognize you and/or
              your device(s). You may read our for more information on why we
              use them (such as authenticating you, remembering your preferences
              and settings, analyzing site traffic and trends, delivering and
              measuring the effectiveness of advertising campaigns, allowing you
              to use social features) and how you can better control their use,
              through your browser settings and other tools.
            </Text>
          </View>
          <View>
            <Text>
              Some web browsers (including Safari, Internet Explorer, Firefox
              and Chrome) have a “Do Not Track” (“
              <Text styls={{fontWeight: '700', fontSize: 13}}>DNT</Text>
              ”) feature that tells a website that a user does not want to have
              his or her online activity tracked. If a website that responds to
              a DNT signal receives a DNT signal, the browser can block that
              website from collecting certain information about the browser’s
              user. Not all browsers offer a DNT option and DNT signals are not
              yet uniform. For this reason, many businesses, including Armago,
              do not currently respond to DNT signals.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            5. How We Use Information
          </Text>
          <View>
            <Text>
              The main reason we use your information is to deliver and improve
              our services. Additionally, we use your info to help keep you safe
              and to provide you with advertising that may be of interest to
              you. Read on for a more detailed explanation of the various
              reasons we use your information, together with practical examples.
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To administer your account and provide our services to you
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>• Create and manage your account</Text>
            <Text>
              • Provide you with customer support and respond to your requests
            </Text>
            <Text>• Complete your transactions</Text>
            <Text>
              • Communicate with you about our services, including order
              management and billing
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To help you connect with other users
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>
              • Analyze your profile, activity on the service, and preferences
              to recommend meaningful connections to you and recommend you to
              others; For more information on our profiling and automated
              decision-making
            </Text>
            <Text>• Show users’ profiles to one another</Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To ensure a consistent experience across your devices
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>
              • Link the various devices you use so that you can enjoy a
              consistent experience of our services on all of them. We do this
              by linking devices and browser data, such as when you log into
              your account on different devices or by using partial or full IP
              address, browser version and similar data about your devices to
              help identify and link them.
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To provide new Armago services to you
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>
              • Register you and display your profile on new Armago features and
              apps
            </Text>
            <Text>
              • Administer your account on these new features and apps
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To serve you relevant offers and ads
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>
              • Administer sweepstakes, contests, discounts or other offers
            </Text>
            <Text>
              • Develop, display and track content and advertising tailored to
              your interests on our services and other sites
            </Text>
            <Text>
              • Communicate with you by email, phone, social media or mobile
              device about products or services that we think may interest you
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To improve our services and develop new ones
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>• Administer focus groups and surveys</Text>
            <Text>
              • Conduct research and analysis of users’ behaviour to improve our
              services and content (for instance, we may decide to change the
              look and feel or even substantially modify a given feature based
              on users’ behaviour)
            </Text>
            <Text>
              • Develop new features and services (for example, we may decide to
              build a new interests-based feature further to requests received
              from users).
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To prevent, detect and fight fraud or other illegal or unauthorized
            activities
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>
              • Address ongoing or alleged misbehaviour on and off-platform
            </Text>
            <Text>
              • Perform data analysis to better understand and design
              countermeasures against these activities
            </Text>
            <Text>
              • Retain data related to fraudulent activities to prevent against
              recurrences
            </Text>
          </View>
          <Text style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
            To ensure legal compliance
          </Text>
          <View style={{paddingLeft: 10}}>
            <Text>• Comply with legal requirements</Text>
            <Text>• Assist law enforcement</Text>
            <Text>• Enforce or exercise our rights, for example our Terms</Text>
          </View>
          <View>
            <Text>
              To process your information as described above, we rely on the
              following legal bases:
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text>
              •{' '}
              <Text style={{fontStyle: 'italic'}}>
                Provide our service to you:
              </Text>{' '}
              Most of the time, the reason we process your information is to
              perform the contract that you have with us. For instance, as you
              go about using our service to build meaningful connections, we use
              your information to maintain your account and your profile, to
              make it viewable to other users and recommend other users to you.
            </Text>
            <Text>
              • <Text style={{fontStyle: 'italic'}}>Legitimate interests:</Text>{' '}
              We may use your information where we have legitimate interests to
              do so. For instance, we analyze users’ behavior on our services to
              continuously improve our offerings, we suggest offers we think
              might interest you, and we process information for administrative,
              fraud detection and other legal purposes.
            </Text>
            <Text>
              • <Text style={{fontStyle: 'italic'}}>Consent:</Text> From time to
              time, we may ask for your consent to use your information for
              certain specific reasons. You may withdraw your consent at any
              time by contacting us at the address provided at the end of this
              Privacy Policy.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            6. How We Share Information
          </Text>
          <View>
            <Text>
              Since our goal is to help you make meaningful connections, the
              main sharing of users’ information is, of course, with other
              users. We also share some users’ information with service
              providers and partners who assist us in operating the services
              and, in some cases, legal authorities. Read on for more details
              about how your information is shared with others.
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
                • With other users
              </Text>
              <View>
                <Text>
                  You share information with other users when you voluntarily
                  disclose information on the service (including your public
                  profile). Please be careful with your information and make
                  sure that the content you share is stuff that you’re
                  comfortable being publically viewable since neither you nor we
                  can control what others do with your information once you
                  share it.
                </Text>
              </View>
              <View>
                <Text>
                  If you choose to limit the audience for all or part of your
                  profile or for certain content or information about you, then
                  it will be visible according to your settings.
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
                • With our service providers and partners
              </Text>
              <View>
                <Text>
                  We use third parties to help us operate and improve our
                  services. These third parties assist us with various tasks,
                  including data hosting and maintenance, analytics, customer
                  care, marketing, advertising, payment processing and security
                  operations.
                </Text>
              </View>
              <View>
                <Text>
                  We may also share information with partners who distribute and
                  assist us in advertising our services. For instance, we may
                  share limited information on you in hashed, non-human readable
                  form to advertising partners.
                </Text>
              </View>
              <View>
                <Text>
                  We follow a strict vetting process prior to engaging any
                  service provider or working with any partner. All of our
                  service providers and partners must agree to strict
                  confidentiality obligations.
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
                • For corporate transactions
              </Text>
              <View>
                <Text>
                  We may transfer your information if we are involved, whether
                  in whole or in part, in a merger, sale, acquisition,
                  divestiture, restructuring, reorganization, dissolution,
                  bankruptcy or other change of ownership or control.
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
                • When required by law
              </Text>
              <View>
                <Text>
                  We may disclose your information if reasonably necessary: (i)
                  to comply with a legal process, such as a court order or
                  search warrant, government / law enforcement investigation or
                  other legal requirements; (ii) to assist in the prevention or
                  detection of crime (subject in each case to applicable law);
                  or (iii) to protect the safety of any person.
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
                • To enforce legal rights
              </Text>
              <View>
                <Text>
                  We may also share information: (i) if disclosure would
                  mitigate our liability in an actual or threatened lawsuit;
                  (ii) as necessary to protect our legal rights and legal rights
                  of our users, business partners or other interested parties;
                  (iii) to enforce our agreements with you; and (iv) to
                  investigate, prevent, or take other action regarding illegal
                  activity, suspected fraud or other wrongdoing.
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{paddingVertical: 5, fontSize: 17, fontWeight: '700'}}>
                • With your consent or at your request
              </Text>
              <View>
                <Text>
                  We may ask for your consent to share your information with
                  third parties. In any such case, we will make it clear why we
                  want to share the information.
                </Text>
              </View>
              <View>
                <Text>
                  We may use and share non-personal information (meaning
                  information that, by itself, does not identify who you are
                  such as device information, general demographics, general
                  behavioral data, geolocation in de-identified form), as well
                  as personal information in hashed, non-human readable form,
                  under any of the above circumstances. We may combine this
                  information with additional non-personal information or
                  personal information in hashed, non-human readable form
                  collected from other sources. More information on our use of
                  cookies and similar technologies can be found in our Cookie
                  Policy
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            7. Cross-Border Data Transfers
          </Text>
          <View>
            <Text>
              Sharing of information laid out in Section 6 sometimes involves
              cross-border data transfers. As an example, where the service
              allows for users to be located in the European Economic Area
              (“EEA”), their personal information is transferred to countries
              outside of the EEA. We use standard contract clauses approved by
              the European Commission or other suitable safeguard to permit data
              transfers from the EEA to other countries. Standard contractual
              clauses are commitments between companies transferring personal
              data, binding them to protect the privacy and security of your
              data
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            Your Rights
          </Text>
          <View>
            <Text>
              We want you to be in control of your information, so we have
              provided you with the following tools:
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text>
              •{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                Access / Update tools in the service.
              </Text>{' '}
              Tools and account settings that help you to access, rectify or
              delete information that you provided to us and that’s associated
              with your account directly within the service. If you have any
              question on those tools and settings, please contact our customer
              care team for help.
            </Text>
            <Text>
              •{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                Device permissions.
              </Text>{' '}
              Mobile platforms have permission systems for specific types of
              device data and notifications, such as phone book and location
              services as well as push notifications. You can change your
              settings on your device to either consent or oppose the collection
              of the corresponding information or the display of the
              corresponding notifications. Of course, if you do that, certain
              services may lose full functionality.
            </Text>
            <Text>
              • <Text style={{textDecorationLine: 'underline'}}>Deletion.</Text>{' '}
              You can delete your account by using the corresponding
              functionality directly on the service.
            </Text>
          </View>
          <View>
            <Text>
              We want you to be aware of your privacy rights. Here are a few key
              points to remember:
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={{textDecorationLine: 'underline'}}>
              • Reviewing your information.
            </Text>
            <Text>
              {' '}
              Applicable privacy laws may give you the right to review the
              personal information we keep about you (depending on the
              jurisdiction, this may be called right of access, right of
              portability or variations of those terms). You can request a copy
              of your personal information by putting in such a request with
              customer services.{' '}
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              • Updating your information.
            </Text>
            <Text>
              {' '}
              If you believe that the information we hold about you is
              inaccurate or that we are no longer entitled to use it and want to
              request its rectification, deletion or object to its processing,
              please contact customer services.
            </Text>
          </View>
          <View>
            <Text>
              For your protection and the protection of all of our users, we may
              ask you to provide proof of identity before we can answer the
              above requests.
            </Text>
          </View>
          <View>
            <Text>
              Keep in mind, we may reject requests for certain reasons,
              including if the request is unlawful or if it may infringe on
              trade secrets or intellectual property or the privacy of another
              user. If you wish to receive information relating to another user,
              such as a copy of any messages you received from him or her
              through our service, the other user will have to contact our
              Privacy Officer to provide their written consent before the
              information is released.
            </Text>
          </View>
          <View>
            <Text>
              Also, we may not be able to accommodate certain requests to object
              to the processing of personal information, notably where such
              requests would not allow us to provide our service to you anymore.
              For instance, we cannot provide our service if we do not have your
              date of birth.
            </Text>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={{textDecorationLine: 'underline'}}>• Uninstall.</Text>
            <Text>
              {' '}
              You can stop all information collection by an app by uninstalling
              it using the standard uninstall process for your device. If you
              uninstall the app from your mobile device, the unique identifier
              associated with your device will continue to be stored. If you
              re-install the application on the same mobile device, we will be
              able to re-associate this identifier to your previous transactions
              and activities.
            </Text>
            <Text style={{textDecorationLine: 'underline'}}>
              • Accountability.
            </Text>
            <Text>
              {' '}
              In certain countries, including in the European Union, you have a
              right to lodge a complaint with the appropriate data protection
              authority if you have concerns about how we process your personal
              information. The data protection authority you can lodge a
              complaint with notably may be that of your habitual residence,
              where you work or where we are established.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            9. Residents of California
          </Text>
          <View>
            <Text>
              There is specific regulation for California residents, please
              contact us for more information.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            10. How We Protect Your Information
          </Text>
          <View>
            <Text>
              We work hard to protect you from unauthorized access to or
              alteration, disclosure or destruction of your personal
              information. As with all technology companies, although we take
              steps to secure your information, we do not promise, and you
              should not expect, that your personal information will always
              remain secure.
            </Text>
          </View>
          <View>
            <Text>
              We regularly monitor our systems for possible vulnerabilities and
              attacks and regularly review our information collection, storage
              and processing practices to update our physical, technical and
              organizational security measures.
            </Text>
          </View>
          <View>
            <Text>
              We may suspend your use of all or part of the services without
              notice if we suspect or detect any breach of security. If you
              believe that your account or information is no longer secure,
              please notify us immediately
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            11. How Long We Retain Your Information
          </Text>
          <View>
            <Text>
              We keep your personal information only as long as we need it for
              legitimate business purposes (as laid out in Section 5 ) and as
              permitted by applicable law. To protect the safety and security of
              our users on and off our services, we implement a safety retention
              window of three months following account deletion. During this
              period, account information will be retained although the account
              will of course not be visible on the services anymore.
            </Text>
          </View>
          <View>
            <Text>
              In practice, we delete or anonymize your information upon deletion
              of your account (following the safety retention window) or after
              two years of continuous inactivity, unless:
            </Text>
          </View>
          <View style={{marginLeft: 13, padding: 7}}>
            <Text>
              1. we must keep it to comply with applicable law (for instance,
              some “traffic data” is kept for one year to comply with statutory
              data retention obligations);
            </Text>
            <Text>
              2. we must keep it to evidence our compliance with applicable law
              (for instance, records of consents to our Terms, Privacy Policy
              and other similar consents are kept for five years);
            </Text>
            <Text>
              3. there is an outstanding issue, claim or dispute requiring us to
              keep the relevant information until it is resolved; or
            </Text>
            <Text>
              4. the information must be kept for our legitimate business
              interests, such as fraud prevention and enhancing users' safety
              and security. For example, information may need to be kept to
              prevent a user who was banned for unsafe behavior or security
              incidents from opening a new account.
            </Text>
          </View>
          <View>
            <Text>
              Keep in mind that even though our systems are designed to carry
              out data deletion processes according to the above guidelines, we
              cannot promise that all data will be deleted within a specific
              timeframe due to technical constraints.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            Children's Privacy
          </Text>
          <View>
            <Text>
              Our services are restricted to users who are 18 years of age or
              older. We do not permit users under the age of 18 on our platform
              and we do not knowingly collect personal information from anyone
              under the age of 18. If you suspect that a user is under the age
              of 18, please contact customer services.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            Privacy Policy Changes
          </Text>
          <View>
            <Text>
              Because we’re always looking for new and innovative ways to help
              you build meaningful connections, this policy may change over
              time. We will notify you before any material changes take effect
              so that you have time to review the changes.
            </Text>
          </View>
          <Text
            style={{
              paddingVertical: 5,
              fontSize: 20,
              fontWeight: '700',
            }}>
            14. How to Contact Us
          </Text>
          <View>
            <Text>
              If you have questions about this Privacy Policy you can contact
              customer services or admin@armago.uk
            </Text>
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
