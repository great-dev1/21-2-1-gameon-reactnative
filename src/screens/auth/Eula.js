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
import {LongHeader} from '../../components/longHeader';
import AppStatusBar from '../../components/AppStatusBar';
import {colors} from '../../common/colors';

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
          route={props.navigation.state.params.backUrl}
          navigate={navigate}
          removeRightIcon
          dark
        />
        <ScrollView contentContainerStyle={{padding: 20}}>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>
                End-User License Agreement ("Agreement")
              </Text>
              <Text>Last updated: August 14, 2020</Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Please read this End-User License Agreement carefully before
                clicking the "I Agree" button, downloading or using Armago.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Interpretation and Definitions</Text>
              <Text style={{fontSize: 16}}>Interpretation</Text>
              <Text>
                The words of which the initial letter is capitalized have
                meanings defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 16}}>Definitions</Text>
              <Text>For the purposes of this End-User License Agreement:</Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Agreement means this End-User License Agreement that forms the
                entire agreement between You and the Company regarding the use
                of the Application. This Agreement has been created with the
                help of the EULA Generator.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Application means the software program provided by the Company
                downloaded by You to a Device, named Armago
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Company (referred to as either "the Company", "We", "Us" or
                "Our" in this Agreement) refers to Armago LTD, International
                House, 12 Constance Street.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Content refers to content such as text, images, or other
                information that can be posted, uploaded, linked to or otherwise
                made available by You, regardless of the form of that content.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>Country refers to: United Kingdom</Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Device means any device that can access the Application such as
                a computer, a cellphone or a digital tablet.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Third-Party Services means any services or content (including
                data, information, applications and other products services)
                provided by a third-party that may be displayed, included or
                made available by the Application.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You means the individual accessing or using the Application or
                the company, or other legal entity on behalf of which such
                individual is accessing or using the Application, as applicable.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Acknowledgment</Text>
              <Text>
                By clicking the "I Agree" button, downloading or using the
                Application, You are agreeing to be bound by the terms and
                conditions of this Agreement. If You do not agree to the terms
                of this Agreement, do not click on the "I Agree" button, do not
                download or do not use the Application.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                This Agreement is a legal document between You and the Company
                and it governs your use of the Application made available to You
                by the Company.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                The Application is licensed, not sold, to You by the Company for
                use strictly in accordance with the terms of this Agreement.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>License</Text>
              <Text style={{fontSize: 16}}>Scope of License</Text>
              <Text>
                The Company grants You a revocable, non-exclusive,
                non-transferable, limited license to download, install and use
                the Application strictly in accordance with the terms of this
                Agreement.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                The license that is granted to You by the Company is solely for
                your personal, non-commercial purposes strictly in accordance
                with the terms of this Agreement.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Third-Party Services</Text>
              <Text>
                The Application may display, include or make available
                third-party content (including data, information, applications
                and other products services) or provide links to third-party
                websites or services.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You acknowledge and agree that the Company shall not be
                responsible for any Third-party Services, including their
                accuracy, completeness, timeliness, validity, copyright
                compliance, legality, decency, quality or any other aspect
                thereof. The Company does not assume and shall not have any
                liability or responsibility to You or any other person or entity
                for any Third-party Services.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You must comply with applicable Third parties' Terms of
                agreement when using the Application. Third-party Services and
                links thereto are provided solely as a convenience to You and
                You access and use them entirely at your own risk and subject to
                such third parties' Terms and conditions.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Term and Termination</Text>
              <Text>
                This Agreement shall remain in effect until terminated by You or
                the Company. The Company may, in its sole discretion, at any
                time and for any or no reason, suspend or terminate this
                Agreement with or without prior notice.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                This Agreement will terminate immediately, without prior notice
                from the Company, in the event that you fail to comply with any
                provision of this Agreement. You may also terminate this
                Agreement by deleting the Application and all copies thereof
                from your Device or from your computer.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Upon termination of this Agreement, You shall cease all use of
                the Application and delete all copies of the Application from
                your Device.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Termination of this Agreement will not limit any of the
                Company's rights or remedies at law or in equity in case of
                breach by You (during the term of this Agreement) of any of your
                obligations under the present Agreement.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Indemnification</Text>
              <Text>
                You agree to indemnify and hold the Company and its parents,
                subsidiaries, affiliates, officers, employees, agents, partners
                and licensors (if any) harmless from any claim or demand,
                including reasonable attorneys' fees, due to or arising out of
                your: (a) use of the Application; (b) violation of this
                Agreement or any law or regulation; or (c) violation of any
                right of a third party.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>No Warranties</Text>
              <Text>
                The Application is provided to You "AS IS" and "AS AVAILABLE"
                and with all faults and defects without warranty of any kind. To
                the maximum extent permitted under applicable law, the Company,
                on its own behalf and on behalf of its affiliates and its and
                their respective licensors and service providers, expressly
                disclaims all warranties, whether express, implied, statutory or
                otherwise, with respect to the Application, including all
                implied warranties of merchantability, fitness for a particular
                purpose, title and non-infringement, and warranties that may
                arise out of course of dealing, course of performance, usage or
                trade practice. Without limitation to the foregoing, the Company
                provides no warranty or undertaking, and makes no representation
                of any kind that the Application will meet your requirements,
                achieve any intended results, be compatible or work with any
                other software, applications, systems or services, operate
                without interruption, meet any performance or reliability
                standards or be error free or that any errors or defects can or
                will be corrected.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Without limiting the foregoing, neither the Company nor any of
                the company's provider makes any representation or warranty of
                any kind, express or implied: (i) as to the operation or
                availability of the Application, or the information, content,
                and materials or products included thereon; (ii) that the
                Application will be uninterrupted or error-free; (iii) as to the
                accuracy, reliability, or currency of any information or content
                provided through the Application; or (iv) that the Application,
                its servers, the content, or e-mails sent from or on behalf of
                the Company are free of viruses, scripts, trojan horses, worms,
                malware, timebombs or other harmful components.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Some jurisdictions do not allow the exclusion of certain types
                of warranties or limitations on applicable statutory rights of a
                consumer, so some or all of the above exclusions and limitations
                may not apply to You. But in such a case the exclusions and
                limitations set forth in this section 11 shall be applied to the
                greatest extent enforceable under applicable law. To the extent
                any warranty exists under law that cannot be disclaimed, the
                Company shall be solely responsible for such warranty.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Limitation of Liability</Text>
              <Text>
                Notwithstanding any damages that You might incur, the entire
                liability of the Company and any of its suppliers under any
                provision of this Agreement and your exclusive remedy for all of
                the foregoing shall be limited to the amount actually paid by
                You for the Application or through the Application.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                To the maximum extent permitted by applicable law, in no event
                shall the Company or its suppliers be liable for any special,
                incidental, indirect, or consequential damages whatsoever
                (including, but not limited to, damages for loss of profits,
                loss of data or other information, for business interruption,
                for personal injury, loss of privacy arising out of or in any
                way related to the use of or inability to use the Application,
                third-party software and/or third-party hardware used with the
                Application, or otherwise in connection with any provision of
                this Agreement), even if the Company or any supplier has been
                advised of the possibility of such damages and even if the
                remedy fails of its essential purpose.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                Some states/jurisdictions do not allow the exclusion or
                limitation of incidental or consequential damages, so the above
                limitation or exclusion may not apply to You.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Severability and Waiver</Text>
              <Text style={{fontSize: 16}}>Severability</Text>
              <Text>
                If any provision of this Agreement is held to be unenforceable
                or invalid, such provision will be changed and interpreted to
                accomplish the objectives of such provision to the greatest
                extent possible under applicable law and the remaining
                provisions will continue in full force and effect.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 16}}>Waiver</Text>
              <Text>
                Except as provided herein, the failure to exercise a right or to
                require performance of an obligation under this Agreement shall
                not effect a party's ability to exercise such right or require
                such performance at any time thereafter nor shall be the waiver
                of a breach constitute a waiver of any subsequent breach.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Product Claims</Text>
              <Text>
                The Company does not make any warranties concerning the
                Application.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>United States Legal Compliance</Text>
              <Text>
                You represent and warrant that (i) You are not located in a
                country that is subject to the United States government embargo,
                or that has been designated by the United States government as a
                "terrorist supporting" country, and (ii) You are not listed on
                any United States government list of prohibited or restricted
                parties.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Changes to this Agreement</Text>
              <Text>
                The Company reserves the right, at its sole discretion, to
                modify or replace this Agreement at any time. If a revision is
                material we will provide at least 30 days' notice prior to any
                new terms taking effect. What constitutes a material change will
                be determined at the sole discretion of the Company.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                By continuing to access or use the Application after any
                revisions become effective, You agree to be bound by the revised
                terms. If You do not agree to the new terms, You are no longer
                authorized to use the Application.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Governing Law</Text>
              <Text>
                The laws of the Country, excluding its conflicts of law rules,
                shall govern this Agreement and your use of the Application.
                Your use of the Application may also be subject to other local,
                state, national, or international laws.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Entire Agreement</Text>
              <Text>
                The Agreement constitutes the entire agreement between You and
                the Company regarding your use of the Application and supersedes
                all prior and contemporaneous written or oral agreements between
                You and the Company.
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text>
                You may be subject to additional terms and conditions that apply
                when You use or purchase other Company's services, which the
                Company will provide to You at the time of such use or purchase.
              </Text>
            </View>
          </View>
          <View>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontSize: 20}}>Contact Us</Text>
              <Text>
                If you have any questions about this Agreement, You can contact
                Us: By email: admin@armago.uk
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
