import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";

const SubTitle = styled.div`
font-weight:bold;
margin-bottom:16px;
font-size:${props => props.theme.size.font3};
`
const Text = styled.div`
margin-bottom:24px;
font-size:${props => props.theme.size.font4};
line-height:20px;
`
const Policy = () => {
    const params = useParams();
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (params.pk == 0) {
            setTitle("이용약관");
        } else if (params.pk == 1) {
            setTitle("개인정보처리방침");
        } else if (params.pk == 2) {
            setTitle("저작권정책");

        }
    }, [params])
    return (
        <>
            <Wrappers>
                <Title not_arrow={true}>{title}</Title>
                {params.pk == 0 ?
                    <>
                        <SubTitle>제 1 장 총 칙</SubTitle>

                        <SubTitle>제 1 조 (목적)</SubTitle>
                        <Text>
                            이 약관은 “퍼스트파트너스“ (이하 회사라 칭함)가 제공하는 모든 서비스(이하 서비스라 칭함)의 이용조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.
                        </Text>

                        <SubTitle>제 2 조 (정의)</SubTitle>
                        <Text>
                            - "서비스"라 함은 회사가 회원에게 직접 또는 제휴사와 함께 제공하는 회사 및 회사 관련 제반 서비스를 의미합니다.<br />
                            - "회원"이란 회사와 서비스 이용에 관한 계약을 체결한 자로서, 회사의 서비스에 로그인하여 본 약관에 따라 회사가 제공하는 서비스를 받는 자를 말합니다.<br />
                            - "아이디(ID)"라 함은 회원이 자체적으로 선정한 회원의 서비스를 받기 위하여 회원이 선정하고 회사가 승인하여 등록된 문자와 숫자의 조합을 말합니다.<br />
                            - 비밀번호의 관리는 서비스의 이용자의 책임으로 합니다.<br />
                            - "해지"라 함은 회사 또는 이용계약을 해약하는 것을 말합니다.<br />
                        </Text>

                        <SubTitle>제 3 조 (약관의 효력과 변경)</SubTitle>
                        <Text>
                            - 이 약관은 이용자에게 "이용약관"란에 공시함으로써 효력을 발생합니다.<br />
                            - 합리적인 사유가 발생할 경우 회사는 전자상거래 등에서의 소비자 보호에 관한 법률 등에 관한 법률 등 관련법을 위배되지 않는 범위 안에서 개정할 수 있습니다.<br />
                            - 회사가 약관을 개정 시에는 그 개정사실과 개정 후의 약관을 서비스화면 상에 게시합니다. 변경된 약관은 본조 1항과 같은 방법으로 효력을 발생합니다.<br />
                            - 이 약관에서 정하지 아니한 사항 등은 소비자 보호에 관한 법률, 공정거래위원회가 정하는 전자 상거래 등에서의 소비자 보호 지침 및 관계 법령 또는 상관례를 따릅니다.<br />
                        </Text>



                        <SubTitle>제 2 장 회원 가입 계약</SubTitle>

                        <SubTitle>제 4 조 (이용 계약의 성립 및 개인정보 제공 동의 등)</SubTitle>
                        <Text>
                            - 이용 계약은 이용자의 이용 신청에 대한 회사의 이용 승인과 이용자의 약관 내용에 대한 동의로 성립됩니다.<br />
                            - 회원가입은 일반 회원가입 방법 또는 다양한 소셜 로그인 계정을 이용하여 가능합니다. 소셜 로그인 계정이란 네이버, 카카오 등 소셜 서비스 가입 시 사용한 이메일 주소 (또는 아이디)와 패스워드를 뜻합니다.<br />
                            - 소셜 로그인 계정을 통해 서비스에 로그인하면 개인정보 입력 프로세스 진행 후 별도의 서비스 계정을 생성합니다.<br />
                        </Text>
                        <SubTitle>제 5 조 (이용신청의 승낙과 제한)</SubTitle>
                        <Text>
                            - 회사는 제1조에 따른 이용신청에 대하여 특별한 사정이 없는 한 원칙적으로 이용신청을  승낙합니다.<br />
                            - 회사는 다음 각 호에 해당하는 경우 이용신청에 대한 승낙을 제한할 수 있고, 그 사유가 해소 될 때까지 승낙을 유보할 수 있습니다.<br />
                            - 아래 사항에 해당하는 경우 승낙을 제한 보류 할 수 있습니다.<br /><br />
                            1. 등록내용에 허위 등 본인의 진정한 정보를 제공하지 아니한 경우<br />
                            2. 서비스 관련 설비의 용량이 부족한 경우<br />
                            3. 영리를 목적으로 본 서비스를 이용하고자 하는 경우<br />
                            4. 서비스 관련 설비의 용량이 부족한 경우<br />
                            5. 기타 회사가 필요하다고 인정되는 경우<br />
                            6. 회원가입 완료 후 3항에 대한 사유가 발견될 경우 승낙을 철회할 수 있습니다.<br />
                        </Text>

                        <SubTitle>제 3 장 권리와 의무</SubTitle>

                        <SubTitle>제 6 조 (회사의 의무)</SubTitle>
                        <Text>
                            - 회사는 특별한 사정이 없는 한 이용자가 신청한 서비스를 이용할 수 있도록 합니다.<br />
                            - 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화, 용역을 제공하는데 최선을 다하여야 합니다.<br />
                            - 회사는 이용계약체결, 계약사항의 변경 해지 등에 있어 회원에게 안정적 서비스를 제공하도록 노력합니다.<br />
                        </Text>
                        <SubTitle>제 7 조 (회원의 의무)</SubTitle>
                        <Text>
                            - 회원은 가입 신청 또는 정보 변경 시 허위내용을 등록하거나 타인 등의 정보를 등록할 경우 이와 관련된 모든 권리를 주장할 수 없습니다.<br />
                            - 회사의 업무에 방해가 되는 행위, 회사의 명예를 손상시키는 행위, 타인에게 피해를 주는 행위는 해서는 안 됩니다.<br />
                            - 제3자의 저작권 등 지적재산권에 대한 침해 서비스 운영의 방해 행위 혹은 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위는 금합니다.<br />
                            - 회원은 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게, 양도증여 할 수 없으며 이를 담보로서 제공할 수 없고, 제3자에게 ID 및 비밀번호를 이용하게 해서는 아니됩니다.<br />
                            - 회원은 관계법령, 이 약관의 규정, 이용안내 및 주의사항 등 회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 아니됩니다.<br />
                            - 회원은 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 이를 타인에게 제공할 수 없습니다.<br />
                            - 회원은 회사 서비스 이용과 관련 다음 각 호의 행위를 하여서는 아니 되고, 이를 위반할 시 민 형사상 법적 조치를 받을 수 있습니다.<br /><br />

                            1. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위<br />
                            2. 다른 회원의 아이디(ID)를 부정사용하는 행위<br />
                            3. 선량한 풍속, 기타 사회질서를 해하는 행위<br />
                            4. 타인의 명예를 훼손하거나 모욕하는 행위<br />
                            5. 해킹행위 또는 컴퓨터바이러스의 유포행위<br />
                            6. 관계법령에 위배되는 행위<br />
                            7. 기타 회사가 서비스 운영상 부적절하다고 판단하는 행위<br />
                        </Text>

                        <SubTitle>제 4 장 서비스 제공 및 제한</SubTitle>

                        <SubTitle>제 8 조 (서비스 제공)</SubTitle>
                        <Text>
                            정보 제공 및 구매계약의 체결<br />
                            기타 회사가 추가로 고안하거나 다른 회사와의 제휴계약을 통해 회원에게 제공하는 일체의 서비스<br /><br />

                            - 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.<br />
                            - 회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스 제공화면에 공지한 바에 따릅니다.<br />
                        </Text>
                        <SubTitle>제 9 조 (회원에 대한 통지)</SubTitle>
                        <Text>
                            - 회사가 회원에 대해 통지를 하는 경우, 회원이 회사에 제출한 전자우편 주소로 할 수 있습니다.<br />
                            - 회사는 불특정다수 회원에 대한 통지의 경우 서비스 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.<br />
                        </Text>
                        <SubTitle>제 10 조 (서비스의 변경 및 중단)</SubTitle>
                        <Text>
                            - 회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스의 전부 또는 일부를 변경할 수 있습니다.<br />
                            - 회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요에 따라 수정하거나 중단 또는 변경할 수 있습니다.<br />
                        </Text>
                        <SubTitle>제 11 조 (정보서비스이용제한)</SubTitle>
                        <Text>
                            - 서비스용 설비의 이전, 정기점검, 보수 또는 공사로 인한 부득이한 경우<br />
                            - 기간 통신사업자가 회선에 대한 전기통신서비스를 중지한 경우<br />
                            - 국가비상사태, 정전, 서비스의 설비장애 또는 기타 정상적인 서비스 제공이 어려운 경우<br />
                            - 기타 귀사가 서비스를 제공할 수 없는 사유가 발생한 경우<br />
                        </Text>

                        <SubTitle>제 5 장 이용자 계약 해지 및 서비스 이용제한</SubTitle>

                        <SubTitle>제 12 조 (계약 해지 및 이용제한)</SubTitle>
                        <Text>
                            - 회원의 탈퇴 신청에 대해 회사는 특별한 사유가 없는 한 빠른 시간 내로 탈퇴 처리를 해주고 회원이 사망한 때는 회원자격을 상실합니다.<br />
                            - 회사는 이용자가 다음 사항에 해당하는 행위를 하였을 경우 사전 통지 없이 이용 계약을 해지 또는 서비스 이용을 중지할 수 있습니다.<br /><br />

                            1. 타인의 서비스 아이디 및 비밀 번호를 도용한 경우<br />
                            2. 타인의 명예를 손상시키거나 불이익을 주는 경우<br />
                            3. 같은 사용자가 다른 아이디로 이중 등록을 한 경우<br />
                            4. 공공질서 및 미풍양속에 반하는 경우<br />
                            5. 범죄적 행위에 관련되는 경우<br />
                            6. 이용자가 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획 또는 실행할 경우<br />
                            7. 회사에서 규정한 게시물 등 원칙에 반하는 경우<br />
                            8. 회사는 게시물 등에 대하여 제 3자로부터 명예 훼손 등 권리침해를 이유로 중단 등 요청이 있을 경우 이를 잠정적으로 계시 중단 할 수 있으며 제3자간의 분쟁은 관련 기관 등 결정에 따릅니다.<br />
                            9. 기타 회사의 이익에 반하는 행위 행동을 하거나 그에 준한다고 판단되는 경우<br />
                            10. 서비스에 위해를 가하는 등 서비스의 건전한 이용을 저해하는 경우<br />
                            11. 기타 관련법령이나 회사가 정한 이용조건에 위배되는 경우<br /><br />

                            - 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.<br /><br />

                            1. 가입 신청 시에 허위 내용을 등록한 경우<br />
                            2. 회사를 이용하여 구입한 재화 등의 대금, 기타 회사 사이트 이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우<br />
                            3. 다른 사람의 회사 사이트 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우<br />
                            4. 회사를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우<br />
                        </Text>
                        <SubTitle>제 13 조 (이용 제한의 해제 절차)</SubTitle>
                        <Text>
                            - 회사는 제12조의 규정에 의하여 이용제한을 하고자 하는 경우에는 그 사유, 일시 및 기간을 정하여 E-Mail, 서면 또는 전화 등의 방법에 의하여 해당 이용자 또는 대리인에게 통지합니다. 다만, 회사가 긴급하게 이용을 정지할 필요가 있다고 인정하는 경우에는 그러하지 아니합니다.<br />
                            - 제1항의 규정에 의하여 이용정지의 통지를 받은 이용자 또는 그 대리인은 그 이용정지의 통지에 대하여 이의가 있을 때에는 이의신청을 할 수 있습니다.<br />
                            - 회사는 이용정지 기간 중에 그 이용정지 사유가 해소된 것이 확인된 경우에는 이용정지조치를 즉시 해제합니다.<br />
                        </Text>

                        <SubTitle>제 6 장 손해배상 및 기타</SubTitle>

                        <SubTitle>제 14 조 (손해배상)</SubTitle>
                        <Text>
                            회사는 제공되는 서비스와 관련한 증권거래를 함에 있어, 정보내용에 대한 최종 판단 및 결정은 회원 본인이 하여야 하므로 그에 따른 제반 손실 등에 대한 책임을 지지 않습니다.<br />
                        </Text>
                        <SubTitle>제 15 조 (면책조항)</SubTitle>
                        <Text>
                            - 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공 중지에 대한 책임이 면제됩니다.<br />
                            - 회사는 서비스용 설비의 정기검사 보수 교체 등 공사에 의한 부득이한 사유로 발생한 손해에 대한 책임은 면제됩니다.<br />
                        </Text>
                        <SubTitle>제 16 조 (저작권귀속 및 이용제한)</SubTitle>
                        <Text>
                            - 회사가 작성한 서비스에 관한 저작권 및 기타 지적 재산권은 회사에 귀속됩니다.<br />
                            - 회원이 작성한 게시물에 대한 저작권은 이를 게시한 회원에 있습니다. 단, 회원이 작성한 게시물의 2차적 저작물 작성권은 회사에게 있으며, 회사는 회원의 게시물을 홍보 등의 목적으로 이용할 수 있습니다.<br />
                            - 회원은 서비스를 이용함으로써 얻은 정보를 회사의 사전승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용 하거나, 제 3자에게 이용하게 하여서는 안됩니다.<br />
                        </Text>
                        <SubTitle>제 17 조 (분쟁의 해결)</SubTitle>
                        <Text>
                            회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다. 제1항의 규정에도 불구하고, 동 분쟁으로 인하여 소송이 제기될 경우 동 소송은 회사의 본사소재지를 관할하는 법원의 관할로 합니다.<br />
                        </Text>

                        <Text>
                            [부 칙]<br />
                            이 약관은 2022년 10월 1일부터 시행합니다.<br />
                        </Text>
                    </>
                    :
                    <>
                    </>}
                {params.pk == 1 ?
                    <>
                        <Text>
                            퍼스트파트너스(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.<br />
                        </Text>

                        <SubTitle>제1조 (개인정보의 처리목적)</SubTitle>
                        <Text>
                            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br /><br />

                            1. 홈페이지 회원 가입 및 관리<br />
                            회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보처리 시 법정대리인의 동의 여부 확인, 각종 고지․통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.<br /><br />

                            2. 재화 또는 서비스 제공<br />
                            물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.<br /><br />

                            3. 고충 처리<br />
                            민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등의 목적으로 개인정보를 처리합니다.<br /><br />

                            4. 이벤트 정보 및 신규 서비스 안내<br />
                            이벤트 정보, 신규 서비스 안내, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다. 단, 광고 목적의 알림 발송 시에는 동의한 회원에 한하며, 마이페이지나 고객센터를 통해 동의를 철회할 수 있습니다.<br />
                        </Text>

                        <SubTitle>제2조 (개인정보의 처리 및 보유기간)</SubTitle>
                        <Text>
                            ① 회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.<br />
                            ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br /><br />

                            1. 홈페이지 회원 가입 및 관리 : 사업자/단체 홈페이지 탈퇴 시까지<br />
                            다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지<br />
                            1) 관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지<br />
                            2) 홈페이지 이용에 따른 채권 및 채무관계 잔존 시에는 해당 채권, 채무 관계 정산 시까지<br />
                        </Text>

                        <SubTitle>제3조(이용자 및 법정대리인의 권리와 그 행사 방법)</SubTitle>
                        <Text>
                            ① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.<br />
                            1. 개인정보 열람 요구<br />
                            2. 오류 등이 있을 경우 정정 요구<br />
                            3. 삭제요구<br />
                            4. 처리정지 요구<br />
                            ② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.<br />
                            ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.<br />
                            ④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br />
                            ⑤ 정보주체는 개인정보 보호법 등 관계 법령을 위반하여 회사가 처리하고 있는 정보주체 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니 됩니다.<br />
                        </Text>

                        <SubTitle>제4조(처리하는 개인정보 항목)</SubTitle>
                        <Text>
                            회사는 다음의 개인정보 항목을 처리하고 있습니다.<br /><br />

                            1. 홈페이지 회원 가입 및 관리<br />
                            필수항목 : 성명, 아이디, 비밀번호, 전화번호, 닉네임<br /><br />

                            2. 재화 또는 서비스 제공<br />
                            필수항목 : 성명, 아이디, 비밀번호, 전화번호, 닉네임<br /><br />

                            3. 인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.<br />
                            IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등<br />
                        </Text>

                        <SubTitle>제5조(개인정보의 파기)</SubTitle>
                        <Text>
                            ① 회사는 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br />
                            ② 정보주체로부터 동의받은 개인정보 보유 기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br />
                            ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br /><br />

                            1. 파기 절차<br />
                            회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.<br /><br />

                            2. 파기 방법<br />
                            회사는 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 로우레밸포멧(Low Level Format) 등의 방법을 이용하여 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.<br />
                        </Text>

                        <SubTitle>제6조(개인정보의 안전성 확보조치)</SubTitle>
                        <Text>
                            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다.<br />
                            1. 관리적 조치 : 내부관리계획 수립 및 시행, 정기적 직원 교육 등<br />
                            2. 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 접근통제시스템 설치, 고유 식별정보<br />
                            등의 암호화, 보안프로그램 설치<br />
                            3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제<br />
                        </Text>

                        <SubTitle>제7조(개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항)</SubTitle>
                        <Text>
                            ① 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br />
                            ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자들의 컴퓨터 내의 하드디스크에 저장되기도 합니다.<br />
                            가. 쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.<br />
                        나. 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.<br />
                            다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.<br />
                        </Text>

                        <SubTitle>제8조(권익침해 구제 방법)</SubTitle>
                        <Text>
                            정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.<br /><br />

                            ▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)<br />
                            - 소관 업무 : 개인정보 침해사실 신고, 상담 신청<br />
                            - 홈페이지 : privacy.kisa.or.kr<br />
                            - 전화 : (국번없이) 118<br />
                            - 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터<br /><br />

                            ▶ 개인정보 분쟁조정위원회<br />
                            - 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)<br />
                            - 홈페이지 : www.kopico.go.kr<br />
                            - 전화 : (국번없이) 1833-6972<br />
                            - 주소 : (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층<br /><br />

                            ▶ 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)<br />
                            ▶ 경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)<br />
                        </Text>

                        <SubTitle>제9조(개인정보 처리방침 시행 및 변경)</SubTitle>
                        <Text>
                            이 개인정보 처리방침은 2022. 10. 01 부터 적용됩니다.<br />
                        </Text>
                    </>
                    :
                    <>
                    </>}
                {params.pk == 2 ?
                    <>
                        <Text>
                            저작권 정책<br />

                            위아에서 발행되는 모든 콘텐츠는 저작권법에 의하여 보호받는 저작물로서 저작권은 ㈜퍼스트파트너스에 있습니다.<br /><br />

                            위아(㈜퍼스트파트너스)의 허락 없이 콘텐츠에 대한 무단 복제 및 배포 등 저작권을 침해하는 행위를 금합니다.<br /><br />

                            위아(㈜퍼스트파트너스)에서 발행하는 모든 콘텐츠를 무단으로 상업적으로 이용하거나 기타 영리 목적으로 이용할 경우 민법상 부당이득, 불법행위 등을 이유로 손해배상 책임을 질 수 있습니다.<br />
                            상업적 또는 기타 영리 목적 등으로 이용을 원할 경우 사전에 위아(㈜퍼스트파트너스)와 별도 협의를 하거나 허락을 얻어야 하며, 협의 또는 허락을 얻어 자료의 내용을 게재하는 경우에도 출처가 위아(㈜퍼스트파트너스)임을 반드시 밝혀야 합니다.<br /><br />

                            위아(㈜퍼스트파트너스)에서 발행하는 모든 콘텐츠를 블로그, SNS, 개인용, 비상업용 등 공익, 비영리 목적에 이용할 경우에도 출처를 위아(㈜퍼스트파트너스)로 명시하여야 합니다.<br /><br />

                            위아(㈜퍼스트파트너스)의 콘텐츠를 적법한 절차에 따라 다른 인터넷 사이트에 게재하는 경우에도 내용의 무단 변경을 금지하며, 이를 위반할 때에는 형사처벌을 받을 수 있습니다.<br /><br />

                            위 내용은 저작권법 제123조(침해정지), 저작권법 제125조(손해배상청구)에 근거합니다.<br /><br />

                            저작권 관련 문의사항은 first_partner@naver.com로 문의 바랍니다.<br />
                        </Text>
                    </>
                    :
                    <>
                    </>}
            </Wrappers>
        </>
    )
}
export default Policy;