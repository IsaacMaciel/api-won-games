/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";
import { useModels } from "../../hooks";

import {
  ALink,
  Block,
  Container,
  LinkWrapper,
  P,
  Wave,
  Separator,
} from "./components";
import SocialLink from "./SocialLink";

const FIRST_BLOCK_LINKS = [
  {
    link:
      "https://strapi.io/documentation/v3.x/getting-started/quick-start.html#_4-create-a-category-content-type",
    contentId: "app.components.BlockLink.documentation.content",
    titleId: "app.components.BlockLink.documentation",
  },
  {
    link: "https://github.com/strapi/foodadvisor",
    contentId: "app.components.BlockLink.code.content",
    titleId: "app.components.BlockLink.code",
  },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/strapi/strapi/",
  },
  {
    name: "Slack",
    link: "https://slack.strapi.io/",
  },
  {
    name: "Medium",
    link: "https://medium.com/@strapi",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/strapijs",
  },
  {
    name: "Reddit",
    link: "https://www.reddit.com/r/Strapi/",
  },
];

const HomePage = () => {
  // Temporary until we develop the menu API
  const {
    collectionTypes,
    singleTypes,
    isLoading: isLoadingForModels,
  } = useModels();

  const handleClick = (e) => {
    e.preventDefault();

    push(
      "/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null"
    );
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = (contentTypes) =>
      contentTypes.filter((c) => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 ||
      filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {(title) => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <Block>
              <h2 id="mainHeader"> Seja bem vindo a Won Games!</h2>
              <P>
                Ao lado você pode inserir diferentes jogos, categories e
                publishers para a nossa maravilhosa joga de games
              </P>
              <Separator style={{ marginTop: 37, marginBottom: 36 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {FIRST_BLOCK_LINKS.map((data, index) => {
                  const type = index === 0 ? "doc" : "code";

                  return (
                    <LinkWrapper
                      href={data.link}
                      target="_blank"
                      key={data.link}
                      type={type}
                    >
                      <FormattedMessage id={data.titleId}>
                        {(title) => <p className="bold">{title}</p>}
                      </FormattedMessage>
                      <FormattedMessage id={data.contentId}>
                        {(content) => <p>{content}</p>}
                      </FormattedMessage>
                    </LinkWrapper>
                  );
                })}
              </div>
            </Block>
          </div>

          <div className="col-md-12 col-lg-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              <h2>Veja nossos links!</h2>
              <P>
                Em caso de dúvidas ou sugestões, só ir em algum de nossos links!
              </P>
              <FormattedMessage id="HomePage.roadmap">
                {(msg) => (
                  <ALink
                    rel="noopener noreferrer"
                    href="https://portal.productboard.com/strapi/1-public-roadmap/tabs/2-under-consideration"
                    target="_blank"
                  >
                    {msg}
                  </ALink>
                )}
              </FormattedMessage>

              <Separator style={{ marginTop: 18 }} />
              <div
                className="row social-wrapper"
                style={{
                  display: "flex",
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <SocialLink key={key} {...value} />
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
