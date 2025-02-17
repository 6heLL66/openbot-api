const request = cursor =>
    fetch('https://gql.opensea.io/graphql', {
      headers: {
        accept:
          'application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/json',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        traceparent: '00-00000000000000001296e4287f25e608-7a72604e0f7dc8ed-01',
        tracestate: 'dd=s:1;o:rum',
        'x-app-id': 'os2-web',
        'x-datadog-origin': 'rum',
        'x-datadog-parent-id': '8823220508355840237',
        'x-datadog-sampling-priority': '1',
        'x-datadog-trace-id': '1339508801772316168',
      },
      referrer: 'https://opensea.io/',
      referrerPolicy: 'strict-origin',
      body: `{\"operationName\":\"LeaderboardCollectionTableQuery\",\"query\":\"query LeaderboardCollectionTableQuery($limit: Int!, $cursor: String, $sort: CollectionImportanceSort!) {\\n  collectionsByImportance(limit: $limit, cursor: $cursor, sort: $sort) {\\n    items {\\n      __typename\\n      ...LeaderboardCollectionTableRow\\n    }\\n    nextPageCursor\\n    __typename\\n  }\\n}\\nfragment LeaderboardCollectionTableRow on Collection {\\n  id\\n  name\\n  slug\\n  isVerified\\n  imageUrl\\n  ...CollectionImage\\n  ...CollectionPreviewTooltip\\n  stats {\\n    sevenDays {\\n      sales\\n      volume {\\n        ...Volume\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  floorPrice {\\n    pricePerItem {\\n      ...TokenPrice\\n      __typename\\n    }\\n    __typename\\n  }\\n  importanceWeight\\n  __typename\\n}\\nfragment CollectionImage on Collection {\\n  name\\n  imageUrl\\n  chain {\\n    ...ChainBadge\\n    __typename\\n  }\\n  __typename\\n}\\nfragment ChainBadge on Chain {\\n  identifier\\n  name\\n  __typename\\n}\\nfragment CollectionPreviewTooltip on CollectionIdentifier {\\n  ...CollectionPreviewTooltipContent\\n  __typename\\n}\\nfragment CollectionPreviewTooltipContent on CollectionIdentifier {\\n  slug\\n  __typename\\n}\\nfragment Volume on Volume {\\n  usd\\n  native {\\n    symbol\\n    unit\\n    __typename\\n  }\\n  __typename\\n}\\nfragment TokenPrice on Price {\\n  usd\\n  token {\\n    unit\\n    symbol\\n    contractAddress\\n    chain {\\n      identifier\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\",\"variables\":{\"limit\":50, \"cursor\": \"${cursor}\", \"sort\":{\"by\":\"SCORE\",\"direction\":\"DESC\"}}}`,
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    }).then(res => res.json());
  const func = async () => {
    let lastResponseLength = 50;
    let cursor = '';
  
    let result = [];
  
    while (lastResponseLength === 50) {
      await request(cursor).then(res => {
        console.log(res);
        result.push(...res.data.collectionsByImportance.items);
        lastResponseLength = res.data.collectionsByImportance.items.length;
        cursor = res.data.collectionsByImportance.nextPageCursor;
      });
    }
  
    result = result.map(item => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      is_verified: item.isVerified,
      image_url: item.imageUrl,
      importance_weight: item.importanceWeight,
      chain_name: item.chain.name,
      chain_identifier: item.chain.identifier,
    }));
    console.log(result);
  
    while (result.length) {
      let chunk = result.splice(0, 100)
  
    await fetch('https://opensea-2a2b11e9a157.herokuapp.com/load-collections', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chunk)
    })
    }
  };
  func();
  