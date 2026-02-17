import { ScrollView, Text, View } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8">
        <Text className="mb-6 text-center text-2xl font-bold text-gray-900">개인정보 처리방침</Text>
        <Text className="mb-8 text-center text-base text-gray-600">Halo</Text>

        <Section title="1. 개인정보의 처리 목적">
          <Text className="text-base leading-7 text-gray-700">
            「Cursed By Jesus」(이하 &quot;앱&quot;)은 가톨릭 성인 정보를 제공하는 서비스입니다. 본
            앱은 사용자의 개인정보를 수집하지 않으며, 모든 기능은 별도의 개인정보 처리 없이 이용할
            수 있습니다.
          </Text>
        </Section>

        <Section title="2. 처리하는 개인정보의 항목">
          <Text className="text-base leading-7 text-gray-700">
            본 앱은 어떠한 개인정보도 수집하지 않습니다. 앱 내 모든 데이터(성인 정보, 즐겨찾기 등)는
            사용자의 기기에만 저장되며, 외부 서버로 전송되지 않습니다.
          </Text>
        </Section>

        <Section title="3. 개인정보의 처리 및 보유 기간">
          <Text className="text-base leading-7 text-gray-700">
            본 앱은 개인정보를 수집하지 않으므로, 개인정보의 처리 및 보유 기간에 해당하는 사항이
            없습니다. 앱 내 저장 데이터는 사용자의 기기에서만 관리되며, 앱 삭제 시 함께 삭제됩니다.
          </Text>
        </Section>

        <Section title="4. 개인정보의 제3자 제공">
          <Text className="text-base leading-7 text-gray-700">
            본 앱은 개인정보를 수집하지 않으므로, 제3자에게 제공하는 개인정보가 없습니다.
          </Text>
        </Section>

        <Section title="5. 개인정보의 파기 절차 및 방법">
          <Text className="text-base leading-7 text-gray-700">
            본 앱은 개인정보를 수집하지 않으므로, 파기 절차 및 방법에 해당하는 사항이 없습니다. 기기
            내 저장된 앱 데이터는 앱을 삭제하면 자동으로 삭제됩니다.
          </Text>
        </Section>

        <Section title="6. 정보주체의 권리·의무 및 행사 방법">
          <Text className="text-base leading-7 text-gray-700">
            본 앱은 개인정보를 수집하지 않으므로, 정보주체의 권리·의무 및 행사 방법에 해당하는
            사항이 없습니다. 앱 이용에 관한 문의가 있으시면 아래 연락처로 문의해 주시기 바랍니다.
          </Text>
        </Section>

        <Section title="7. 개인정보 보호책임자">
          <Text className="text-base leading-7 text-gray-700">
            앱 이용에 관한 문의 및 개인정보 관련 불만 처리를 위해 아래와 같이 개인정보 보호책임자를
            지정하고 있습니다.
          </Text>
          <Text className="mt-2 text-base leading-7 text-gray-700">
            이메일: imcoldsurf@gmail.com
          </Text>
        </Section>

        <Section title="8. 시행일자" isLast>
          <Text className="text-base leading-7 text-gray-700">
            이 개인정보 처리방침은 2026년 2월 15일부터 시행됩니다.
          </Text>
        </Section>
      </View>
    </ScrollView>
  );
}

function Section({
  title,
  children,
  isLast = false,
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <View className={isLast ? '' : 'mb-6'}>
      <Text className="mb-2 text-lg font-semibold text-gray-900">{title}</Text>
      {children}
    </View>
  );
}
